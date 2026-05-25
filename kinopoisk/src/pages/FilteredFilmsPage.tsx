import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { fetchFilteredMovies } from "../redux/movies-slice";
import { FiltersSidebar } from "../components/Filters";
import { FilmsList } from "../components/FilmsList";
import { Pagination } from "../components/Pagination";

export function FilteredFilmsPage(): React.ReactElement {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { page } = useParams();

  const currentPageNumber = Number(page) || 1;

  const moviesFilterState = useAppSelector((state) => state.filters);
  const moviesState = useAppSelector((state) => state.moviesList);

  useEffect(() => {
    dispatch(
      fetchFilteredMovies({
        selectedCountryIdentifier: moviesFilterState.selectedCountryIdentifier,
        selectedGenreIdentifier: moviesFilterState.selectedGenreIdentifier,
        selectedMovieType: moviesFilterState.selectedMovieType,
        selectedSortingOrder: moviesFilterState.selectedSortingOrder,
        minimumRatingValue: moviesFilterState.minimumRatingValue,
        maximumRatingValue: moviesFilterState.maximumRatingValue,
        minimumYearValue: moviesFilterState.minimumYearValue,
        maximumYearValue: moviesFilterState.maximumYearValue,
        currentPageNumber: currentPageNumber
      })
    );
  }, [
    dispatch,
    currentPageNumber,
    moviesFilterState.selectedCountryIdentifier,
    moviesFilterState.selectedGenreIdentifier,
    moviesFilterState.selectedMovieType,
    moviesFilterState.selectedSortingOrder,
    moviesFilterState.minimumRatingValue,
    moviesFilterState.maximumRatingValue,
    moviesFilterState.minimumYearValue,
    moviesFilterState.maximumYearValue
  ]);

  return (
    <div className="flex gap-6">
      <FiltersSidebar />

      <div className="flex-1 space-y-4">
        {moviesState.loading && (
          <div className="text-gray-300">Загрузка...</div>
        )}

        {!moviesState.loading && moviesState.filteredMovies.length > 0 && (
          <FilmsList films={moviesState.filteredMovies} />
        )}

        {!moviesState.loading && moviesState.filteredMovies.length === 0 && (
          <div className="text-gray-400">Нет результатов</div>
        )}

        <Pagination
          currentPage={currentPageNumber}
          totalPages={moviesState.filteredTotalPages}
          onPageChange={(pageNumber) =>
            navigate(`/films/filters/${pageNumber}`)
          }
        />
      </div>
    </div>
  );
}
