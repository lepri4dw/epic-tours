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

export interface DestinationsWithCount extends Destination {
  tourCount: number;
}

export interface DestinationMutation {
  name: string;
  image: File | null;
  rows: string;
  cols: string;
}

export interface Tour {
  _id: string;
  title: string;
  images: string[];
  destinations: Destination[];
  price: number;
  description: string;
  route: string | null;
  places: string;
  duration: number;
  schedule: {
    title: string;
    description: string;
    dayNumber: number;
  }[];
}

export interface TourMutation {
  title: string;
  images: File[] | null;
  destinations: string[];
  price: string;
  description: string;
  route: File | null;
  places: string;
  duration: string;
  schedule: {
    title: string;
    description: string;
    dayNumber: string;
  }[];
}