import React, { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../redux/store"
import { fetchMovieById } from "../redux/movies-slice"
import { FilmsList } from "../components/FilmsList"

export function FavoriteMovies(): React.ReactElement {
    const dispatch = useAppDispatch()
    const { favorite, favoriteMovies, loading, error } = useAppSelector(state => state.movies)

    useEffect(() => {
        favorite.forEach(movieId => {
            const exists = favoriteMovies.some(movie => movie.id === movieId)

            if (!exists) {
                dispatch(fetchMovieById(movieId))
            }
        })
    }, [favorite, favoriteMovies, dispatch])

    return (
        <div className="flex gap-6 px-4 py-10">
            <div className="flex-1">
                {favoriteMovies.length === 0 ? (
                    <div className="text-gray-400 text-lg">
                        У вас пока нет избранных фильмов
                    </div>
                ) : (
                    <FilmsList
                        films={favoriteMovies}
                        loading={loading}
                        error={error}
                    />
                )}
            </div>
        </div>
    )
}
