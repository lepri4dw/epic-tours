import {ITourImage, Tour, ValidationError} from "../../types";
import {createSlice} from "@reduxjs/toolkit";
import {createTour, deleteTour, fetchOneTour, fetchTours, fetchToursImages, updateTour} from "./toursThunks";
import {RootState} from "../../app/store";

interface ToursState {
  items: Tour[],
  oneTour: Tour | null,
  toursImages: ITourImage[],
  fetchOneLoading: boolean,
  fetchLoading: boolean;
  submitting: boolean;
  error: ValidationError | null;
  deleteLoading: string | false;
}

const initialState: ToursState = {
  items: [],
  oneTour: null,
  toursImages: [],
  fetchOneLoading: false,
  fetchLoading: false,
  submitting: false,
  error: null,
  deleteLoading: false
};

const toursSlice = createSlice({
  name: 'tours',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTours.pending, (state) => {
        state.fetchLoading = true;
      })
      .addCase(fetchTours.fulfilled, (state, {payload: tours}) => {
        state.fetchLoading = false;
        state.items = tours;
      })
      .addCase(fetchTours.rejected, (state) => {
        state.fetchLoading = false;
      })

      .addCase(fetchToursImages.pending, (state) => {
        state.fetchLoading = true;
      })
      .addCase(fetchToursImages.fulfilled, (state, {payload: images}) => {
        state.fetchLoading = false;
        state.toursImages = images;
      })
      .addCase(fetchToursImages.rejected, (state) => {
        state.fetchLoading = false;
      })

      .addCase(fetchOneTour.pending, (state) => {
        state.fetchOneLoading = true;
      })
      .addCase(fetchOneTour.fulfilled, (state, {payload: tour}) => {
        state.fetchOneLoading = false;
        state.oneTour = tour;
      })
      .addCase(fetchOneTour.rejected, (state) => {
        state.fetchOneLoading = false;
      })

      .addCase(createTour.pending, (state) => {
        state.error = null;
        state.submitting = true;
      })
      .addCase(createTour.fulfilled, (state) => {
        state.submitting = false;
      })

      .addCase(createTour.rejected, (state, {payload: error}) => {
        state.error = error || null;
        state.submitting = false;
      })
      .addCase(updateTour.pending, (state) => {
        state.error = null;
        state.submitting = true;
      })

      .addCase(updateTour.fulfilled, (state) => {
        state.submitting = false;
      })
      .addCase(updateTour.rejected, (state, {payload: error}) => {
        state.error = error || null;
        state.submitting = false;
      })

      .addCase(deleteTour.pending, (state, {meta: {arg: id}}) => {
        state.deleteLoading = id;
      })
      .addCase(deleteTour.fulfilled, (state) => {
        state.deleteLoading = false;
      })
      .addCase(deleteTour.rejected, (state) => {
        state.deleteLoading = false;
      });
  },
});

export const toursReducer = toursSlice.reducer;

export const selectTours = (state: RootState) => state.tours.items;
export const selectToursFetching = (state: RootState) => state.tours.fetchLoading;
export const selectToursImages = (state: RootState) => state.tours.toursImages;
export const selectOneTour = (state: RootState) => state.tours.oneTour;
export const selectOneTourFetching = (state: RootState) => state.tours.fetchOneLoading;
export const selectTourSubmitting = (state: RootState) => state.tours.submitting;
export const selectTourError = (state: RootState) => state.tours.error;
export const selectTourDeleting = (state: RootState) => state.tours.deleteLoading;