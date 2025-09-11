import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        fullName: { label: "Full Name", type: "text" },
        passwordRepeat: { label: "Password Repeat", type: "password" },
      },
      authorize: async (credentials) => {
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

        const data = await result.json();

        if (!result.ok) {
          throw new Error(JSON.stringify(data));
        }

        return {
          id: data.id,
          name: data.name,
          email: data.email,
        };
      },
    }),
  ],
});

export { handler as GET, handler as POST };
