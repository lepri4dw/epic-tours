export interface User {
  _id: string;
  username: string;
  token: string;
  role: string;
}

export interface ValidationError {
  errors: {
    [key: string]: {
      name: string;
      message: string;
    }
  },
  message: string;
  name: string;
  _message: string;
}

export interface GlobalError {
  error: string;
}

export interface LoginMutation {
  username: string;
  password: string;
}

export interface RegisterResponse {
  message: string;
  user: User;
}

export interface Destination {
  _id: string;
  name: string;
  image: string | null;
  rows: number;
  cols: number;
}

export interface DestinationMutation {
  name: string;
  image: string | null;
  rows: string;
  cols: string;
}