import {createAsyncThunk} from '@reduxjs/toolkit';
import {GlobalError, LoginMutation, RegisterResponse, User} from '../../types';
import axiosApi from '../../axiosApi';
import {isAxiosError} from 'axios';
import {RootState} from '../../app/store';
import {unsetUser} from './usersSlice';

export const login = createAsyncThunk<User, LoginMutation, { rejectValue: GlobalError }>(
  'users/login',
  async (loginMutation, {rejectWithValue}) => {
    try {
      const response = await axiosApi.post<RegisterResponse>('/users/sessions', loginMutation);
      return response.data.user;
    } catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 400) {
        return rejectWithValue(e.response.data as GlobalError);
      }
      throw e;
    }

  }
);

export const logout = createAsyncThunk<void, void, { state: RootState }>(
  'users/logout',
  async (_, {getState, dispatch}) => {
    const token = getState().users.user?.token;

    await axiosApi.delete('/users/sessions', {headers: {'Authorization': token}});
    dispatch(unsetUser());
  }
);