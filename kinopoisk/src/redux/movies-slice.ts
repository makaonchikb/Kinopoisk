import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { requestMovies, requestSeries, requestFilm, requestSearchMovies } from "../services/films";
import type { Movie, MoviesState } from "../types/types";

export const fetchMovies = createAsyncThunk(
    "movies/fetchMovies",
    async (page: number, { rejectWithValue }) => {
        try {
            const data = await requestMovies(page);

            const mapped = data.items
                .map((film) => ({
                    id: film.kinopoiskId,
                    title: film.nameRu || film.nameEn || "",
                    poster: film.posterUrlPreview || "",
                    year: film.year,
                    rating: film.ratingKinopoisk ?? null,
                    genres: film.genres?.map((genres) => genres.genre) ?? [],
                    countries: film.countries?.map((countries) => countries.country) ?? [],
                }))
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
                .map((film) => ({
                    id: film.kinopoiskId,
                    title: film.nameRu || film.nameEn || "",
                    poster: film.posterUrlPreview || "",
                    year: film.year,
                    rating: film.ratingKinopoisk ?? null,
                    genres: film.genres?.map((genres) => genres.genre) ?? [],
                    countries: film.countries?.map((countries) => countries.country) ?? [],
                }))
                .filter((film) => film.title && film.poster);

            return {
                items: mapped,
                totalPages: data.totalPages,
            };
        } catch (error) {
            return rejectWithValue(
                error instanceof Error ? error.message : "Error loading series"
            );
        }
    }
);

export const fetchMovieById = createAsyncThunk(
    "movies/fetchMovieById",
    async (id: number, { rejectWithValue }) => {
        try {
            const film = await requestFilm(id);

            return {
                id: film.kinopoiskId,
                title: film.nameRu || film.nameEn || "",
                poster: film.posterUrlPreview || "",
                year: film.year,
                rating: film.ratingKinopoisk ?? null,
                genres: film.genres?.map((genres) => genres.genre) ?? [],
                countries: film.countries?.map((countries) => countries.country) ?? [],
            };
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const fetchSearchMovies = createAsyncThunk(
  "movies/fetchSearchMovies",
  async (
    payload: { query: string; page: number },
    { rejectWithValue }
  ) => {
    try {
      const data = await requestSearchMovies(payload.query, payload.page);

      const mappedMovies = data.items
        .map((film) => ({
          id: film.kinopoiskId,
          title: film.nameRu || film.nameEn || "",
          poster: film.posterUrlPreview || "",
          year: film.year,
          rating: film.ratingKinopoisk ?? null,
          genres: film.genres?.map((genres) => genres.genre) ?? [],
        }))
        .filter((film) => film.title && film.poster);

      return {
        items: mappedMovies,
        totalPages: data.totalPages,
      };
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Search error"
      );
    }
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
};

export const moviesSlice = createSlice({
    name: "movies",
    initialState,
    reducers: {
        setTotalPages: (state, action: PayloadAction<number>) => {
            state.totalPages = action.payload;
        },

        toggleFavoriteMovie: (state, action: PayloadAction<number>) => {
            const id = action.payload;

            if (state.favorite.includes(id)) {
                state.favorite = state.favorite.filter((movieId) => movieId !== id);
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

        builder.addCase(
            fetchMovies.fulfilled,
            (state, action: PayloadAction<{ items: Movie[]; totalPages: number }>) => {
                state.loading = false;
                state.data = action.payload.items;
                state.totalPages = action.payload.totalPages;
            }
        );

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
            const movie = action.payload;

            const exists = state.data.some((movies) => movies.id === movie.id);

            if (!exists) {
                state.data.push(movie);
            }
        });

        builder.addCase(fetchSearchMovies.pending, (state) => {
            state.loading = true;
            state.error = false;
        });

        builder.addCase(fetchSearchMovies.fulfilled, (state, action) => {
            state.loading = false;
            state.error = false;

            state.searchResults = action.payload.items;
            state.searchTotalPages = action.payload.totalPages;
        });

        builder.addCase(fetchSearchMovies.rejected, (state) => {
            state.loading = false;
            state.error = true;
        });

    },
});

export const { toggleFavoriteMovie, setTotalPages } = moviesSlice.actions;
export const moviesReducer = moviesSlice.reducer;
