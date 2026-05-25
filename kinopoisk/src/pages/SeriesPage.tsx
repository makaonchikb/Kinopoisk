import React, { useEffect } from "react"
import { useParams, useNavigate } from "react-router"
import { useAppDispatch, useAppSelector } from "../redux/store"
import { fetchSeries } from "../redux/movies-slice"
import { FilmsList } from "../components/FilmsList"
import { FiltersSidebar } from "../components/Filters"
import { Pagination } from "../components/Pagination"

export function SeriesPage(): React.ReactElement {
    const { page } = useParams()
    const pageNumber = Number(page) || 1

    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const { series, loading, error, seriesTotalPages } = useAppSelector(
        state => state.moviesList
    )

    useEffect(() => {
        dispatch(fetchSeries(pageNumber))
    }, [pageNumber, dispatch])

    return (
        <div className="flex gap-6 px-4 py-10">
            <div className="w-64 sticky top-20 h-fit">
                <FiltersSidebar />
            </div>

            <div className="flex-1">
                <h1 className="text-2xl font-semibold text-white mb-6">
                    Сериалы
                </h1>

                <Pagination
                    currentPage={pageNumber}
                    totalPages={seriesTotalPages}
                    onPageChange={(page) => navigate(`/series/${page}`)}
                />

                <div className="mb-6"></div>

                <FilmsList 
                    films={series} 
                    loading={loading} 
                    error={error} 
                />

                <Pagination
                    currentPage={pageNumber}
                    totalPages={seriesTotalPages}
                    onPageChange={(page) => navigate(`/series/${page}`)}
                />
            </div>
        </div>
    )
}
