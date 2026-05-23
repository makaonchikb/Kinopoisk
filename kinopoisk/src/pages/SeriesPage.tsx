import React, { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../redux/store"
import { fetchSeries } from "../redux/movies-slice"
import { FilmsList } from "../components/FilmsList"
import { FiltersSidebar } from "../components/Filters"

export function SeriesPage(): React.ReactElement {
    const dispatch = useAppDispatch()
    const { series, loading, error } = useAppSelector(state => state.movies)

    useEffect(() => {
        if (series.length === 0) {
            dispatch(fetchSeries())
        }
    }, [series.length, dispatch])

    return (
        <div className="flex gap-6 px-4 py-10">

            <div className="w-64 sticky top-20 h-fit">
                <FiltersSidebar />
            </div>

            <div className="flex-1">
                <h1 className="text-2xl font-semibold text-white mb-6">
                    Сериалы
                </h1>

                <FilmsList 
                    films={series} 
                    loading={loading} 
                    error={error} 
                />
            </div>
        </div>
    )
}
