import { ApiNotification, IPagination, ValidationError } from '../../types';
import { createSlice } from '@reduxjs/toolkit';
import {
  createNotification,
  fetchNotifications,
  fetchUncheckedCount,
  notificationToggleChecked
} from './notificationsThunks';
import {RootState} from "../../app/store";

interface NotificationsState {
  items: ApiNotification[];
  fetchLoading: boolean;
  createLoading: boolean;
  currentPage: number;
  totalCount: number;
  togglingIsChecked: boolean;
  createNotificationError: ValidationError | null;
  unchecked: number;
}

const initialState: NotificationsState = {
  items: [],
  fetchLoading: false,
  createLoading: false,
  currentPage: 1,
  totalCount: 1,
  togglingIsChecked: false,
  createNotificationError: null,
  unchecked: 0,
};

export const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchNotifications.pending, (state) => {
      state.fetchLoading = true;
    });
    builder.addCase(fetchNotifications.fulfilled, (state, { payload }) => {
      state.fetchLoading = false;
      const result = payload.result as IPagination<ApiNotification>;
      state.items = result.notifications;
      state.currentPage = result.currentPage;
      state.totalCount = result.totalCount;
    });
    builder.addCase(fetchNotifications.rejected, (state) => {
      state.fetchLoading = false;
    });

    builder.addCase(notificationToggleChecked.pending, (state) => {
      state.togglingIsChecked = true;
    });
    builder.addCase(notificationToggleChecked.fulfilled, (state) => {
      state.togglingIsChecked = false;
    });
    builder.addCase(notificationToggleChecked.rejected, (state) => {
      state.togglingIsChecked = false;
    });

    builder.addCase(fetchUncheckedCount.fulfilled, (state, { payload }) => {
      state.unchecked = payload;
    });

    builder.addCase(createNotification.pending, (state) => {
      state.createLoading = true;
    });
    builder.addCase(createNotification.fulfilled, (state) => {
      state.createLoading = false;
    });
    builder.addCase(
      createNotification.rejected,
      (state, { payload: error }) => {
        state.createLoading = false;
        state.createNotificationError = error || null;
      },
    );
  },
});

export const notificationsReducer = notificationsSlice.reducer;

export const selectNotifications = (state: RootState) =>
  state.notifications.items;
export const selectNotificationsFetching = (state: RootState) =>
  state.notifications.fetchLoading;
export const selectNotificationsCount = (state: RootState) =>
  state.notifications.totalCount;
export const selectNotificationsPage = (state: RootState) =>
  state.notifications.currentPage;
export const selectNotificationCreating = (state: RootState) =>
  state.notifications.createLoading;
export const selectCreateNotificationError = (state: RootState) =>
  state.notifications.createNotificationError;
export const selectNotificationTogglingChecked = (state: RootState) =>
  state.notifications.togglingIsChecked;
export const selectUnchecked = (state: RootState) =>
  state.notifications.unchecked;