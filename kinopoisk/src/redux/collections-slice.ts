import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

type CollectionMovie = {
    kinopoiskId: number;
    nameRu: string;
    posterUrlPreview: string;
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
            const response = await fetch(
                `https://kinopoiskapiunofficial.tech/api/v2.2/films/collections?type=${type}&page=${page}`,
                {
                    headers: {
                        "X-API-KEY": import.meta.env.VITE_KP_API_KEY,
                        "Content-Type": "application/json",
                    },
                }
            );

            const data = await response.json();
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

        builder.addCase(fetchCollectionMovies.fulfilled, (state, action) => {
            state.loading = false;

            state.movies = action.payload.movies.map(item => ({
                id: item.kinopoiskId,
                title: item.nameRu || item.nameOriginal,
                poster: item.posterUrlPreview,
                rating: item.ratingKinopoisk,
                year: item.year,
                genres: item.genres.map(g => g.genre),
            }));

            state.totalPages = action.payload.totalPages;
        });


        builder.addCase(fetchCollectionMovies.rejected, (state) => {
            state.loading = false;
            state.error = true;
        });
    },
});

export const collectionsReducer = collectionsSlice.reducer;
