import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface MoviesFilterState {
  selectedGenreIdentifier: number | null;
  selectedCountryIdentifier: number | null;
  selectedMovieType: string | null;
  selectedSortingOrder: "RATING" | "YEAR" | "NUM_VOTE";
  minimumRatingValue: number | null;
  maximumRatingValue: number | null;
  minimumYearValue: number | null;
  maximumYearValue: number | null;
}

const initialState: MoviesFilterState = {
  selectedGenreIdentifier: null,
  selectedCountryIdentifier: null,
  selectedMovieType: null,
  selectedSortingOrder: "RATING",
  minimumRatingValue: null,
  maximumRatingValue: null,
  minimumYearValue: null,
  maximumYearValue: null,
};

const moviesFilterSlice = createSlice({
  name: "moviesFilterSlice",
  initialState,
  reducers: {
    setSelectedGenreIdentifier(state, action: PayloadAction<number | null>) {
      state.selectedGenreIdentifier = action.payload;
    },
    setSelectedCountryIdentifier(state, action: PayloadAction<number | null>) {
      state.selectedCountryIdentifier = action.payload;
    },
    setSelectedMovieType(state, action: PayloadAction<string | null>) {
      state.selectedMovieType = action.payload;
    },
    setSelectedSortingOrder(
      state,
      action: PayloadAction<MoviesFilterState["selectedSortingOrder"]>
    ) {
      state.selectedSortingOrder = action.payload;
    },
    setMinimumRatingValue(state, action: PayloadAction<number | null>) {
      state.minimumRatingValue = action.payload;
    },
    setMaximumRatingValue(state, action: PayloadAction<number | null>) {
      state.maximumRatingValue = action.payload;
    },
    setMinimumYearValue(state, action: PayloadAction<number | null>) {
      state.minimumYearValue = action.payload;
    },
    setMaximumYearValue(state, action: PayloadAction<number | null>) {
      state.maximumYearValue = action.payload;
    },
    resetAllMovieFilters() {
      return initialState;
    },
  },
});

export const {
  setSelectedGenreIdentifier,
  setSelectedCountryIdentifier,
  setSelectedMovieType,
  setSelectedSortingOrder,
  setMinimumRatingValue,
  setMaximumRatingValue,
  setMinimumYearValue,
  setMaximumYearValue,
  resetAllMovieFilters,
} = moviesFilterSlice.actions;

export const moviesFilterReducer = moviesFilterSlice.reducer;
