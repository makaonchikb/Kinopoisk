import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {
  requestMovies,
  requestSeries,
  requestFilm,
  requestSearchMovies,
  requestFilteredMovies,
  requestFilmImages,
  requestFilmStaff,
  requestSimilarMovies,
} from "../services/films";
import type { MoviesState } from "../types/types";

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
  "movies/fetchMovies",
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
  "movies/fetchSeries",
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

export const fetchMovieById = createAsyncThunk(
  "movies/fetchMovieById",
  async (id: number, { rejectWithValue }) => {
    try {
      return await requestFilm(id);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchSearchMovies = createAsyncThunk(
  "movies/fetchSearchMovies",
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
  "movies/fetchFilteredMovies",
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

export const fetchFilmActors = createAsyncThunk(
  "movies/fetchFilmActors",
  async (id: number) => {
    return await requestFilmStaff(id);
  }
);

export const fetchFilmImages = createAsyncThunk(
  "movies/fetchFilmImages",
  async (id: number) => {
    return await requestFilmImages(id);
  }
);

export const fetchSimilarMovies = createAsyncThunk(
  "movies/fetchSimilarMovies",
  async (id: number) => {
    return await requestSimilarMovies(id);
  }
);

const initialState: MoviesState = {
  data: [],
  series: [],
  loading: false,
  error: false,
  totalPages: 0,
  seriesTotalPages: 0,
  searchResults: [],
  searchTotalPages: 0,
  favorite: JSON.parse(localStorage.getItem("favoriteMovies") || "[]"),
  favoriteMovies: [],
  filteredMovies: [],
  filteredTotalPages: 0,
  currentFilm: null,
  currentFilmActors: [],
  currentFilmImages: [],
  currentFilmSimilar: [],
};

export const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    setTotalPages: (state, action: PayloadAction<number>) => {
      state.totalPages = action.payload;
    },

    clearCurrentFilm: (state) => {
      state.currentFilm = null;
      state.currentFilmActors = [];
      state.currentFilmImages = [];
      state.currentFilmSimilar = [];
    },

    toggleFavoriteMovie: (state, action: PayloadAction<number>) => {
      const id = action.payload;

      if (state.favorite.includes(id)) {
        state.favorite = state.favorite.filter((movieId) => movieId !== id);
        state.favoriteMovies = state.favoriteMovies.filter((m) => m.id !== id);
      } else {
        state.favorite.push(id);
      }

      localStorage.setItem("favoriteMovies", JSON.stringify(state.favorite));
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

    builder.addCase(fetchMovieById.fulfilled, (state, action) => {
      const film = action.payload;

      const mapped = {
        id: film.kinopoiskId,
        title: film.nameRu || film.nameEn || "",
        poster: film.posterUrlPreview || film.posterUrl || "",
        year: film.year ?? 0,
        rating: film.ratingKinopoisk ?? null,
        genres: film.genres?.map(g => g.genre) ?? [],
        countries: film.countries?.map(c => c.country) ?? [],
      };

      const exists = state.favoriteMovies.some(m => m.id === mapped.id);
      if (!exists) state.favoriteMovies.push(mapped);

      state.currentFilm = film; 
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

export const { toggleFavoriteMovie, setTotalPages, clearCurrentFilm } =
  moviesSlice.actions;

export const moviesReducer = moviesSlice.reducer;
