import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import type { Movie, MoviesState } from '../types/types'

export const fetchMovies = createAsyncThunk(
    'movies/fetchMovies',
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch(
                'https://kinopoiskapiunofficial.tech/api/v2.2/films',
                {
                    headers: {
                        'X-API-KEY': import.meta.env.VITE_KP_API_KEY,
                        'Content-Type': 'application/json',
                    },
                }
            )

            const data = await response.json()

            const MapFilmInfo = data.items
                .map((film: any) => ({
                    id: film.kinopoiskId,
                    title: film.nameRu || film.nameEn || "",
                    poster: film.posterUrlPreview || "",
                    year: film.year,
                    rating: film.ratingKinopoisk ?? null,
                    genres: film.genres?.map((genres: any) => genres.genre) ?? [],
                    countries: film.countries?.map((countries: any) => countries.country) ?? [],
                }))
                .filter((film) => film.title.trim() !== "" && film.poster.trim() !== "")


            return {
                items: MapFilmInfo,
                totalPages: data.totalPages,
            }
        } catch (error) {
            console.error(error)
            return rejectWithValue(error)
        }
    }
)

export const fetchSeries = createAsyncThunk(
    "movies/fetchSeries",
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch(
                "https://kinopoiskapiunofficial.tech/api/v2.2/films?type=TV_SERIES",
                {
                    headers: {
                        "X-API-KEY": import.meta.env.VITE_KP_API_KEY,
                        "Content-Type": "application/json",
                    },
                }
            )

            const data = await response.json()

            const mapped = data.items
                .map((film: any) => ({
                    id: film.kinopoiskId,
                    title: film.nameRu || film.nameEn || "",
                    poster: film.posterUrlPreview || "",
                    year: film.year,
                    rating: film.ratingKinopoisk ?? null,
                    genres: film.genres?.map((genres: any) => genres.genre) ?? [],
                    countries: film.countries?.map((countries: any) => countries.country) ?? [],
                }))
                .filter(film => film.title && film.poster)

            return mapped
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

export const fetchMovieById = createAsyncThunk(
    "movies/fetchMovieById",
    async (id: number, { rejectWithValue }) => {
        try {
            const response = await fetch(
                `https://kinopoiskapiunofficial.tech/api/v2.2/films/${id}`,
                {
                    headers: {
                        "X-API-KEY": import.meta.env.VITE_KP_API_KEY,
                        "Content-Type": "application/json",
                    },
                }
            )

            const film = await response.json()

            return {
                id: film.kinopoiskId,
                title: film.nameRu || film.nameEn || "",
                poster: film.posterUrlPreview || "",
                year: film.year,
                rating: film.ratingKinopoisk ?? null,
                genres: film.genres?.map((genre: any) => genre.genre) ?? [],
                countries: film.countries?.map((country: any) => country.country) ?? [],
            }
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)


const initialState: MoviesState = {
    data: [],
    series: [],
    loading: false,
    error: false,
    totalPages: 0,
    favorite: JSON.parse(localStorage.getItem("favoriteMovies") || "[]"),
}


export const moviesSlice = createSlice({
    name: 'movies',
    initialState,
    reducers: {
        setTotalPages: (state, action: PayloadAction<number>) => {
            state.totalPages = action.payload
        },

        toggleFavoriteMovie: (state, action: PayloadAction<number>) => {
            const id = action.payload

            if (state.favorite.includes(id)) {
                state.favorite = state.favorite.filter(movieId => movieId !== id)
            } else {
                state.favorite.push(id)
            }

            localStorage.setItem("favoriteMovies", JSON.stringify(state.favorite))
        },
    },

    extraReducers: (builder) => {
        builder.addCase(fetchMovies.pending, (state) => {
            state.loading = true
            state.error = false
        })

        builder.addCase(
            fetchMovies.fulfilled,
            (state, action: PayloadAction<{ items: Movie[]; totalPages: number }>) => {
                state.loading = false
                state.data = action.payload.items
                state.totalPages = action.payload.totalPages
            }
        )

        builder.addCase(fetchMovies.rejected, (state) => {
            state.loading = false
            state.error = true
        })

        builder.addCase(fetchSeries.fulfilled, (state, action) => {
            state.series = action.payload
        })

        builder.addCase(fetchMovieById.fulfilled, (state, action) => {
            const movie = action.payload

            const exists = state.data.some(existingMovie => existingMovie.id === movie.id)

            if (!exists) {
                state.data.push(movie)
            }
        })

    },
})

export const { toggleFavoriteMovie } = moviesSlice.actions
export const { setTotalPages } = moviesSlice.actions
export const moviesReducer = moviesSlice.reducer
