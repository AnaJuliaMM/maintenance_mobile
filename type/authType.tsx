export type LoginType = {
  username: string;
  password: string;
};

export type AuthResponseType = {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
};
