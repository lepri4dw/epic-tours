import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi";
import {ITourImage, Tour, TourMutation, ValidationError} from "../../types";
import {isAxiosError} from "axios";

export const fetchTours = createAsyncThunk<Tour[], string | undefined>(
  'tours/fetchAll',
  async (destination) => {
    const response = await axiosApi.get<Tour[]>(destination ? `/tours?destination=${destination}` : '/tours');
    return response.data;
  }
);

export const fetchToursImages = createAsyncThunk(
  'tours/fetchAllImages',
  async () => {
    const response = await axiosApi.get<ITourImage[]>('/tours/images');
    return response.data;
  }
);

export const fetchOneTour = createAsyncThunk<Tour, string>(
  'tours/fetchById',
  async (id) => {
    const response = await axiosApi.get<Tour>(`/tours/${id}`);
    return response.data;
  }
);

export const createTour = createAsyncThunk<void, TourMutation, { rejectValue: ValidationError }>(
  'tours/create',
  async (tourMutation, {rejectWithValue}) => {
    try {
      const formData = new FormData();
      const keys = Object.keys(tourMutation) as (keyof TourMutation)[];
      keys.forEach((key) => {
        const value = tourMutation[key];
        if (value !== null) {
          if (key === 'images' && Array.isArray(value)) {
            value.forEach((image) => {
              if (image instanceof File) {
                formData.append('images', image);
              }
            });
          } if (key === 'destinations' || key === 'schedule') {
            formData.append(key, JSON.stringify(value));
          } else if (!Array.isArray(value)) {
            formData.append(key, value);
          }
        }
      });

      await axiosApi.post('/tours', formData);
    } catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 400) {
        return rejectWithValue(e.response.data as ValidationError);
      }
      throw e;
    }
  }
);

export const updateTour = createAsyncThunk<void, { id: string, tour: TourMutation }, { rejectValue: ValidationError }>(
  'tours/update',
  async ({id, tour}, {rejectWithValue}) => {
    try {
      const formData = new FormData();
      const keys = Object.keys(tour) as (keyof TourMutation)[];
      keys.forEach((key) => {
        const value = tour[key];
        if (value !== null) {
          if (key === 'images' && Array.isArray(value)) {
            value.forEach((image) => {
              if (image instanceof File) {
                formData.append('images', image);
              }
            });
          } if (key === 'destinations' || key === 'schedule') {
            formData.append(key, JSON.stringify(value));
          } else if (!Array.isArray(value)) {
            formData.append(key, value);
          }
        }
      });
      await axiosApi.put(`/tours/${id}`, formData);
    } catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 400) {
        return rejectWithValue(e.response.data as ValidationError);
      }
      throw e;
    }
  }
);

export const deleteTour = createAsyncThunk<void, string>(
  'tours/delete',
  async (id) => {
    await axiosApi.delete(`/tours/${id}`);
  }
);