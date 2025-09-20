import { jwtDecode } from "jwt-decode";
import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { refreshOnce } from "./refreshToken";

type LoginResponse = {
  token: string;
  refreshToken: string;
  expiresIn: number;
  user: {
    id: string;
    email: string;
    name: string;
    createdAt: string;
    updatedAt: string;
  };
};

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.SYSTEM_NEXT_OAUTH_GOOGLE_CLIENT_ID as string,
      clientSecret: process.env
        .SYSTEM_NEXT_OAUTH_GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        fullName: { label: "Full Name", type: "text" },
        passwordRepeat: { label: "Password Repeat", type: "password" },
        type: { label: "Type", type: "text" },
      },
      authorize: async (credentials) => {
        switch (credentials?.type) {
          case "register": {
            const result = await fetch(
              `${process.env.SYSTEM_NEXT_API_URL}auth/register`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  email: credentials?.email,
                  name: credentials?.fullName,
                  password: credentials?.password,
                  confirmPassword: credentials?.passwordRepeat,
                }),
              },
            );

            const data: LoginResponse = await result.json();

            if (!result.ok) {
              throw new Error(JSON.stringify(data));
            }

            const decodedToken = jwtDecode(data.token);

            return {
              id: data.user.id,
              name: data.user.name,
              email: data.user.email,
              accessToken: data.token,
              refreshToken: data.refreshToken,
              tokenExp: decodedToken.exp,
            };
          }

          case "login": {
            const result = await fetch(
              `${process.env.SYSTEM_NEXT_API_URL}auth/login`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  email: credentials?.email,
                  password: credentials?.password,
                }),
              },
            );

            const data: LoginResponse = await result.json();

            if (!result.ok) {
              throw new Error(JSON.stringify(data));
            }

            const decodedToken = jwtDecode(data.token);

            return {
              id: data.user.id,
              name: data.user.name,
              email: data.user.email,
              accessToken: data.token,
              refreshToken: data.refreshToken,
              tokenExp: decodedToken.exp,
            };
          }

          default:
            throw new Error("Invalid type");
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    jwt: async ({ token, user, account }) => {
      if (user && account) {
        switch (account.provider) {
          case "google": {
            try {
              const response = await fetch(
                `${process.env.SYSTEM_NEXT_API_URL}auth/google`,
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    email: user.email,
                    name: user.name,
                    accountId: account.providerAccountId,
                    // accessToken: account.access_token,
                    idToken: account.id_token,
                  }),
                },
              );

              if (response.ok) {
                const data: LoginResponse = await response.json();
                const decodedToken = jwtDecode(data.token);

                token.accessToken = data.token;
                token.refreshToken = data.refreshToken;
                token.tokenExp = decodedToken.exp;
                token.id = data.user.id;
                token.name = data.user.name;
                token.email = data.user.email;

                return token;
              } else {
                throw new Error("Failed to authenticate with Google");
              }
            } catch (error) {
              throw new Error("Google authentication failed", { cause: error });
            }
          }

          case "credentials": {
            token.accessToken = user.accessToken;
            token.refreshToken = user.refreshToken;
            token.tokenExp = user.tokenExp;

            return token;
          }
        }
      }

      const accessTokenExpires: number = token.tokenExp! * 1000;

      if (Date.now() < accessTokenExpires) return token;

      try {
        const result = await refreshOnce(token.refreshToken as string);

        const decodedToken = jwtDecode(result.token);

        token.accessToken = result.token;
        token.refreshToken = result.refreshToken;
        token.tokenExp = decodedToken.exp;

        return token;
      } catch {
        // If refresh token fails, throw error to invalidate the session
        throw new Error("Refresh token failed");
      }
    },
    session: async ({ session, token }) => {
      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;

      return session;
    },
  },
  debug: process.env.NODE_ENV === "development",
};
