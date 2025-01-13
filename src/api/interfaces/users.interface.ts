export interface User {
  fullName: string;
  email: string;
  phone: string;
  password: string;
}

export interface TokenPayload {
  id: number;
  email: string;
  phone: string;
}

export interface DbUser extends User {
  id: number;
  createdAt: object;
  updatedAt: object;
}
