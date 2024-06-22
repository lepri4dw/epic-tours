import {createSlice} from '@reduxjs/toolkit';
import {RootState} from '../../app/store';
import {Destination, DestinationsWithCount, ValidationError} from '../../types';
import {
  fetchDestinations,
  createDestination,
  deleteDestination,
  updateDestination,
  fetchOneDestination
} from './destinationsThunks';

interface DestinationsState {
  items: DestinationsWithCount[],
  fetchLoading: boolean;
  oneDestination: Destination | null,
  fetchOneLoading: boolean,
  submitting: boolean;
  error: ValidationError | null;
  deleteLoading: string | false;
}

const initialState: DestinationsState = {
  items: [],
  fetchLoading: false,
  oneDestination: null,
  fetchOneLoading: false,
  submitting: false,
  error: null,
  deleteLoading: false
};

const destinationsSlice = createSlice({
  name: 'destinations',
  initialState,
  reducers: {
    cleanError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchDestinations.pending, (state) => {
      state.fetchLoading = true;
    });
    builder.addCase(fetchDestinations.fulfilled, (state, {payload: destinations}) => {
      state.fetchLoading = false;
      state.items = destinations;
    });
    builder.addCase(fetchDestinations.rejected, (state) => {
      state.fetchLoading = false;
    });

    builder.addCase(fetchOneDestination.pending, (state) => {
      state.fetchOneLoading = true;
    })
    builder.addCase(fetchOneDestination.fulfilled, (state, {payload: destination}) => {
      state.fetchOneLoading = false;
      state.oneDestination = destination;
    })
    builder.addCase(fetchOneDestination.rejected, (state) => {
      state.fetchOneLoading = false;
    })

    builder.addCase(createDestination.pending, (state) => {
      state.error = null;
      state.submitting = true;
    });
    builder.addCase(createDestination.fulfilled, (state) => {
      state.submitting = false;
    });
    builder.addCase(createDestination.rejected, (state, {payload: error}) => {
      state.error = error || null;
      state.submitting = false;
    });

    builder.addCase(deleteDestination.pending, (state, {meta: {arg: id}}) => {
      state.deleteLoading = id;
    });
    builder.addCase(deleteDestination.fulfilled, (state) => {
      state.deleteLoading = false;
    });
    builder.addCase(deleteDestination.rejected, (state) => {
      state.deleteLoading = false;
    });

    builder.addCase(updateDestination.pending, (state) => {
      state.error = null;
      state.submitting = true;
    });
    builder.addCase(updateDestination.fulfilled, (state) => {
      state.submitting = false;
    });
    builder.addCase(updateDestination.rejected, (state, {payload: error}) => {
      state.error = error || null;
      state.submitting = false;
    });
  },
});

export const destinationsReducer = destinationsSlice.reducer;

export const selectDestinations = (state: RootState) => state.destinations.items;
export const selectDestinationsFetching = (state: RootState) => state.destinations.fetchLoading;
export const selectOneDestination = (state: RootState) => state.destinations.oneDestination;
export const selectOneDestinationFetching = (state: RootState) => state.destinations.fetchOneLoading;
export const selectDestinationSubmitting = (state: RootState) => state.destinations.submitting;
export const selectDestinationError = (state: RootState) => state.destinations.error;
export const selectDestinationDeleting = (state: RootState) => state.destinations.deleteLoading;
export const {cleanError} = destinationsSlice.actions;