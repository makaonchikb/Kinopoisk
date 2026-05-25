import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {
  requestMovies,
  requestSeries,
  requestSearchMovies,
  requestFilteredMovies,
} from "../services/films";
import type { MoviesListState } from "../types/types";

const mapFilm = (film: any) => ({
  id: film.kinopoiskId,
  title: film.nameRu || film.nameEn || "",
  poster: film.posterUrlPreview || film.posterUrl || "",
  year: film.year ?? 0,
  rating: film.ratingKinopoisk ?? null,
  genres: film.genres?.map((g: any) => g.genre) ?? [],
  countries: film.countries?.map((c: any) => c.country) ?? [],
});

export const fetchMovies = createAsyncThunk(
  "moviesList/fetchMovies",
  async (page: number, { rejectWithValue }) => {
    try {
      const data = await requestMovies(page);

      const mapped = data.items
        .map(mapFilm)
        .filter((film) => film.title && film.poster);

      return {
        items: mapped,
        totalPages: data.totalPages,
      };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchSeries = createAsyncThunk(
  "moviesList/fetchSeries",
  async (page: number, { rejectWithValue }) => {
    try {
      const data = await requestSeries(page);

      const mapped = data.items
        .map(mapFilm)
        .filter((film) => film.title && film.poster);

      return {
        items: mapped,
        totalPages: data.totalPages,
      };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchSearchMovies = createAsyncThunk(
  "moviesList/fetchSearchMovies",
  async (payload: { query: string; page: number }, { rejectWithValue }) => {
    try {
      const data = await requestSearchMovies(payload.query, payload.page);

      const mappedMovies = data.items
        .map(mapFilm)
        .filter((film) => film.title && film.poster);

      return {
        items: mappedMovies,
        totalPages: data.totalPages,
      };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchFilteredMovies = createAsyncThunk(
  "moviesList/fetchFilteredMovies",
  async (payload, { rejectWithValue }) => {
    try {
      const data = await requestFilteredMovies(payload);

      const mappedMovies = data.items
        .map(mapFilm)
        .filter((film) => film.title && film.poster);

      return {
        items: mappedMovies,
        totalPages: data.totalPages,
      };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const initialState: MoviesListState = {
  data: [],
  series: [],
  loading: false,
  error: false,
  totalPages: 0,
  seriesTotalPages: 0,
  searchResults: [],
  searchTotalPages: 0,
  filteredMovies: [],
  filteredTotalPages: 0,
};

export const moviesListSlice = createSlice({
  name: "moviesList",
  initialState,
  reducers: {
    setTotalPages: (state, action: PayloadAction<number>) => {
      state.totalPages = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchMovies.pending, (state) => {
      state.loading = true;
      state.error = false;
    });

    builder.addCase(fetchMovies.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload.items;
      state.totalPages = action.payload.totalPages;
    });

    builder.addCase(fetchMovies.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });

    builder.addCase(fetchSeries.fulfilled, (state, action) => {
      state.series = action.payload.items;
      state.seriesTotalPages = action.payload.totalPages;
      state.loading = false;
      state.error = false;
    });

    builder.addCase(fetchSearchMovies.pending, (state) => {
      state.loading = true;
      state.error = false;
    });

    builder.addCase(fetchSearchMovies.fulfilled, (state, action) => {
      state.loading = false;
      state.searchResults = action.payload.items;
      state.searchTotalPages = action.payload.totalPages;
    });

    builder.addCase(fetchSearchMovies.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });

    builder.addCase(fetchFilteredMovies.pending, (state) => {
      state.loading = true;
      state.error = false;
    });

    builder.addCase(fetchFilteredMovies.fulfilled, (state, action) => {
      state.loading = false;
      state.filteredMovies = action.payload.items;
      state.filteredTotalPages = action.payload.totalPages;
    });

    builder.addCase(fetchFilteredMovies.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });
  },
});

export const { setTotalPages } = moviesListSlice.actions;
export const moviesListReducer = moviesListSlice.reducer;
