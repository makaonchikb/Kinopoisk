import { useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { FilmsList } from "../components/FilmsList";
import { FiltersSidebar } from "../components/Filters";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { fetchMovies } from "../redux/movies-slice";
import { Pagination } from "../components/Pagination";

export function MoviePage() {
  const { page } = useParams();
  const pageNumber = Number(page) || 1;

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { data: films, loading, totalPages } = useAppSelector(
    (state) => state.moviesList
  );

  useEffect(() => {
    dispatch(fetchMovies(pageNumber));
  }, [pageNumber, dispatch]);

  if (loading) {
    return (
      <div className="flex gap-6 px-4 py-10">
        <div className="w-64 bg-neutral-900/80 border-r border-white/10 rounded-lg h-screen"></div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 flex-1">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="bg-white/5 rounded-lg h-80"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex gap-6 px-4 py-10">
      <div className="w-64 sticky top-20 h-fit">
        <FiltersSidebar />
      </div>

      <div className="flex-1">
        <h1 className="text-2xl font-semibold text-gray-200 mb-6">Главная</h1>

        <Pagination
          currentPage={pageNumber}
          totalPages={totalPages}
          onPageChange={(page) => navigate(`/films/${page}`)}
        />

        <div className="mb-6"></div>

        <FilmsList films={films} />

        <Pagination
          currentPage={pageNumber}
          totalPages={totalPages}
          onPageChange={(page) => navigate(`/films/${page}`)}
        />
      </div>
    </div>
  );
}
