import { meQuery } from "./me";

class AuthService {
  public readonly me = meQuery;
}

export const authService = new AuthService();
