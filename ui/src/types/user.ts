export type User = {
  _id: string;
  name: string;
  lastName: string;
  email: string;
  status: boolean | string;
  role?: number;
  password?: string;
  userType: string;
  token: string;
};

export type UserPayload = {
  name: string;
  lastName: string;
  email: string;
  role: number;
};

export type UserUpdatePayloadType = {
  _id: string;
  name?: string;
  lastName?: string;
  email?: string;
  status?: boolean;
  role?: number;
  password?: string;
  token?: string;
};
