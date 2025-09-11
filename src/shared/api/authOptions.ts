import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: AuthOptions = {
  providers: [
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

            const data: {
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
            } = await result.json();

            if (!result.ok) {
              throw new Error(JSON.stringify(data));
            }

            return {
              id: data.user.id,
              name: data.user.name,
              email: data.user.email,
              accessToken: data.token,
              refreshToken: data.refreshToken,
            };
          }

          case "login": {
            return null;
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
    jwt: async ({ token, user }) => {
      if (user) {
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
      }
      return token;
    },
    session: async ({ session, token }) => {
      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;
      return session;
    },
  },
};
