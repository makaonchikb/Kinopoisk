import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { requestCollection } from "../services/collections";
import { FilmsResponse } from "../types/types";

type CollectionMovie = {
  id: number;
  title: string;
  poster: string;
  rating: number | null;
  year: number | null;
  genres: string[];
};

type CollectionsState = {
  movies: CollectionMovie[];
  totalPages: number;
  loading: boolean;
  error: boolean;
};

const initialState: CollectionsState = {
  movies: [],
  totalPages: 1,
  loading: false,
  error: false,
};

export const fetchCollectionMovies = createAsyncThunk(
  "collections/fetchCollectionMovies",
  async (
    { type, page }: { type: string; page: number },
    { rejectWithValue }
  ) => {
    try {
      const data: FilmsResponse = await requestCollection(type, page);

      return {
        movies: data.items,
        totalPages: data.totalPages,
      };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const collectionsSlice = createSlice({
  name: "collections",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCollectionMovies.pending, (state) => {
      state.loading = true;
      state.error = false;
    });

    builder.addCase(
      fetchCollectionMovies.fulfilled,
      (state, action: PayloadAction<{ movies: any[]; totalPages: number }>) => {
        state.loading = false;

        state.movies = action.payload.movies.map((item) => ({
          id: item.kinopoiskId,
          title: item.nameRu || item.nameOriginal,
          poster: item.posterUrlPreview,
          rating: item.ratingKinopoisk,
          year: item.year,
          genres: item.genres.map((g: any) => g.genre),
        }));

        state.totalPages = action.payload.totalPages;
      }
    );

    builder.addCase(fetchCollectionMovies.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });
  },
});

export const collectionsReducer = collectionsSlice.reducer;
