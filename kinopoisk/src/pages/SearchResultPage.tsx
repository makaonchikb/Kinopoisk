import { useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { fetchSearchMovies } from "../redux/movies-slice";
import { FilmsList } from "../components/FilmsList";
import { Pagination } from "../components/Pagination";

export function SearchResultsPage() {
  const { query, page } = useParams();
  const pageNumber = Number(page) || 1;

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {
    searchResults,
    searchTotalPages,
    loading,
    error,
  } = useAppSelector((state) => state.moviesList);

  useEffect(() => {
    if (query) {
      dispatch(fetchSearchMovies({ query, page: pageNumber }));
    }
  }, [query, pageNumber, dispatch]);

  return (
    <div className="px-4 py-10">
      <h1 className="text-2xl text-white mb-6">
        Результаты поиска: {query}
      </h1>

      <FilmsList
        films={Array.isArray(searchResults) ? searchResults : []}
        loading={loading}
        error={error}
      />

      <Pagination
        currentPage={pageNumber}
        totalPages={searchTotalPages}
        onPageChange={(newPage) => navigate(`/search/${query}/${newPage}`)}
      />
    </div>
  );
}
