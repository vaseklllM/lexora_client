import { logoutQuery } from "./logout";

class AuthService {
  public readonly logout = logoutQuery;
}

export const authService = new AuthService();
