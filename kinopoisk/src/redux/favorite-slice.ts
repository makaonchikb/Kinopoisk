import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { requestFilm } from "../services/films";
import type { FavoritesState } from "../types/types";

const mapFilm = (film: any) => ({
  id: film.kinopoiskId,
  title: film.nameRu || film.nameEn || "",
  poster: film.posterUrlPreview || film.posterUrl || "",
  year: film.year ?? 0,
  rating: film.ratingKinopoisk ?? null,
  genres: film.genres?.map((g: any) => g.genre) ?? [],
  countries: film.countries?.map((c: any) => c.country) ?? [],
});

export const fetchFavoriteMovieById = createAsyncThunk(
  "favorites/fetchFavoriteMovieById",
  async (id: number, { rejectWithValue }) => {
    try {
      const film = await requestFilm(id);
      return mapFilm(film);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const initialState: FavoritesState = {
  favorite: JSON.parse(localStorage.getItem("favoriteMovies") || "[]"),
  favoriteMovies: [],
  loading: false,
  error: false,
};

export const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
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
    builder.addCase(fetchFavoriteMovieById.pending, (state) => {
      state.loading = true;
      state.error = false;
    });

    builder.addCase(fetchFavoriteMovieById.fulfilled, (state, action) => {
      state.loading = false;
      const movie = action.payload;
      const exists = state.favoriteMovies.some((m) => m.id === movie.id);
      if (!exists) state.favoriteMovies.push(movie);
    });

    builder.addCase(fetchFavoriteMovieById.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });
  },
});

export const { toggleFavoriteMovie } = favoritesSlice.actions;
export const favoritesReducer = favoritesSlice.reducer;
