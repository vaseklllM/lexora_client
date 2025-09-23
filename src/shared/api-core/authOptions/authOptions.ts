import { googleAuth } from "@/api/auth/google-auth";
import { login } from "@/api/auth/login";
import { register } from "@/api/auth/register";
import { jwtDecode } from "jwt-decode";
import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { refreshOnce } from "./refreshToken";

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
            const data = await register({
              email: credentials.email,
              name: credentials.fullName,
              password: credentials.password,
              confirmPassword: credentials.passwordRepeat,
            });

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
            const data = await login({
              email: credentials.email,
              password: credentials.password,
            });

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
              if (
                !user ||
                !user.email ||
                !user.name ||
                !account.providerAccountId ||
                !account.id_token
              ) {
                throw new Error("Failed to authenticate with Google");
              }

              const data = await googleAuth({
                email: user.email,
                name: user.name,
                accountId: account.providerAccountId,
                idToken: account.id_token,
              });
              const decodedToken = jwtDecode(data.token);

              token.accessToken = data.token;
              token.refreshToken = data.refreshToken;
              token.tokenExp = decodedToken.exp;
              token.id = data.user.id;
              token.name = data.user.name;
              token.email = data.user.email;

              return token;
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
  // debug: process.env.NODE_ENV === "development",
};
