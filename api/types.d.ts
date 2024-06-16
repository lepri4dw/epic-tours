import {Types} from "mongoose";

export interface IUser {
  username: string;
  password: string;
  token: string;
  role: string;
}

export interface IDestination {
  name: string;
  image: string;
  rows: number;
  cols: number;
}

export interface ITour {
  title: string;
  images: string[];
  destinations: Types.ObjectId[];
  price: number;
  description: string;
  route: string;
  duration: number;
  schedule: {
    title: string;
    description: string;
    dayNumber: number;
  }[];
}