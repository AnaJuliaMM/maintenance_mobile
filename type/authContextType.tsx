import { LoginType } from "./authType";

type AuthContextType = {
  user: any;
  login: (data: LoginType) => Promise<void>;
  logout: () => void;
};

export default AuthContextType;
