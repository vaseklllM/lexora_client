import { fetchInstance } from "../../core/fetchInstance";
import { MeQuery } from "./me";

class AuthService {
  public readonly me = new MeQuery(fetchInstance);
}

export const authService = new AuthService();
