import { useEffect, useState } from "react";
import { FilmsList } from "../components/FilmsList";
import { Film } from "../types/types";
import { mockFilms } from "../mocks/films";
import { FiltersSidebar } from "../components/Filters";

export function MoviePage() {
  const [films, setFilms] = useState<Film[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setFilms(mockFilms);
      setLoading(false);
    }, 800);
  }, []);

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
      <FiltersSidebar />
      <div className="flex-1">
        <FilmsList films={films} />
      </div>
    </div>
  );
}
