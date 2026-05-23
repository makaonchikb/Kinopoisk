import { useEffect } from "react";
import { FilmsList } from "../components/FilmsList";
import { FiltersSidebar } from "../components/Filters";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { fetchMovies } from "../redux/movies-slice";

export function MoviePage() {
  const dispatch = useAppDispatch();
  const { data: films, loading } = useAppSelector((state) => state.movies);

  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);

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
        <FilmsList films={films} />
      </div>
    </div>
  );
}
