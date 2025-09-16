import { logoutQuery } from "./logout";
import { meQuery } from "./me";

class AuthService {
  public readonly me = meQuery;
  public readonly logout = logoutQuery;
}

export const authService = new AuthService();
