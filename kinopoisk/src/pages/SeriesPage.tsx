import { useEffect, useState } from "react";
import { FiltersSidebar } from "../components/Filters";
import { FilmsList } from "../components/FilmsList";
import { Film } from "../types/types";
import { mockFilms } from "../mocks/films";

export function SeriesPage() {
  const [series, setSeries] = useState<Film[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setSeries(mockFilms);
      setLoading(false);
    }, 800);
  }, []);

  if (loading) {
    return (
      <div className="flex gap-6 px-4 py-10">
        <FiltersSidebar />
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
        <FilmsList films={series} />
      </div>
    </div>
  );
}
