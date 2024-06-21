import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi";
import {DestinationMutation, DestinationsWithCount, ValidationError} from "../../types";
import {isAxiosError} from "axios";

export const fetchDestinations = createAsyncThunk(
  'destinations/fetchAll',
  async () => {
    const response = await axiosApi.get<DestinationsWithCount[]>('/destinations');
    return response.data;
  }
);

export const createDestination = createAsyncThunk<void, DestinationMutation, { rejectValue: ValidationError }>(
  'destinations/create',
  async (destinationMutation, {rejectWithValue}) => {
    try {
      const formData = new FormData();
      const keys = Object.keys(destinationMutation) as (keyof DestinationMutation)[];

      keys.forEach(key => {
        const value = destinationMutation[key];

        if (value !== null) {
          formData.append(key, value);
        }
      });
      await axiosApi.post('/destinations', formData);
    } catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 400) {
        return rejectWithValue(e.response.data as ValidationError);
      }
      throw e;
    }
  }
);

export const deleteDestination = createAsyncThunk<void, string>(
  'destinations/delete',
  async (id) => {
    await axiosApi.delete(`/destinations/${id}`);
  }
);

interface UpdateDestinationParams {
  id: string;
  destination: DestinationMutation
}

export const updateDestination = createAsyncThunk<void, UpdateDestinationParams, { rejectValue: ValidationError }>(
  'destinations/update',
  async ({id, destination}, {rejectWithValue}) => {
    try {
      const formData = new FormData();
      const keys = Object.keys(destination) as (keyof DestinationMutation)[];

      keys.forEach(key => {
        const value = destination[key];

        if (value !== null) {
          formData.append(key, value);
        }
      });
      await axiosApi.put(`/destinations/${id}`, formData);
    } catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 400) {
        return rejectWithValue(e.response.data as ValidationError);
      }
      throw e;
    }
  }
);