import "next-auth";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    refreshToken?: string;
    tokenExp?: number;
  }

  interface User {
    accessToken?: string;
    refreshToken?: string;
    tokenExp?: number;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
    refreshToken?: string;
    tokenExp?: number;
  }
}
