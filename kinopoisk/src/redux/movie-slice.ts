import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  requestFilm,
  requestFilmImages,
  requestFilmStaff,
  requestSimilarMovies,
} from "../services/films";
import type { MovieDetailsState } from "../types/types";

export const fetchMovieById = createAsyncThunk(
  "movie/fetchMovieById",
  async (id: number, { rejectWithValue }) => {
    try {
      return await requestFilm(id); // полный объект
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchFilmActors = createAsyncThunk(
  "movie/fetchFilmActors",
  async (id: number) => {
    return await requestFilmStaff(id);
  }
);

export const fetchFilmImages = createAsyncThunk(
  "movie/fetchFilmImages",
  async (id: number) => {
    return await requestFilmImages(id);
  }
);

export const fetchSimilarMovies = createAsyncThunk(
  "movie/fetchSimilarMovies",
  async (id: number) => {
    return await requestSimilarMovies(id);
  }
);

const initialState: MovieDetailsState = {
  currentFilm: null,
  currentFilmActors: [],
  currentFilmImages: [],
  currentFilmSimilar: [],
  loading: false,
  error: false,
};

export const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    clearCurrentFilm: (state) => {
      state.currentFilm = null;
      state.currentFilmActors = [];
      state.currentFilmImages = [];
      state.currentFilmSimilar = [];
      state.loading = false;
      state.error = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchMovieById.pending, (state) => {
      state.loading = true;
      state.error = false;
    });

    builder.addCase(fetchMovieById.fulfilled, (state, action) => {
      state.loading = false;
      state.currentFilm = action.payload;
    });

    builder.addCase(fetchMovieById.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });

    builder.addCase(fetchFilmActors.fulfilled, (state, action) => {
      state.currentFilmActors = action.payload;
    });

    builder.addCase(fetchFilmImages.fulfilled, (state, action) => {
      state.currentFilmImages = action.payload;
    });

    builder.addCase(fetchSimilarMovies.fulfilled, (state, action) => {
      state.currentFilmSimilar = action.payload;
    });
  },
});

export const { clearCurrentFilm } = movieSlice.actions;
export const movieReducer = movieSlice.reducer;
