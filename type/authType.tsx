export type LoginType = {
  username: string;
  password: string;
};

export type authType = {
  username: string;
  password: string;
};

export type JwtPayloadType = {
  username: string;
  role: userRole;
  exp?: number;
  iss?: string;
  aud?: string;
};

export type userRole =
  | "user:admin"
  | "user:user"
  | "user:viewer"
  | "user:editor"
  | null;
