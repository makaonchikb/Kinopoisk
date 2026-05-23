import type { Movie } from "../../types/types"
import { FavoriteButton } from "../FavoriteButton";

type FilmsListProps = {
  films: Movie[];
};

export function FilmsList({ films }: FilmsListProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
      {films.map((film) => (
        <div
          key={film.id}
          className="relative bg-white/5 rounded-lg overflow-hidden hover:scale-[1.02] transition"
        >
          <FavoriteButton id={film.id} />

          <img src={film.poster} className="w-full h-60 object-cover" />

          <div className="p-3 text-gray-300 space-y-1">
            <div className="font-semibold text-white line-clamp-2">
              {film.title}
            </div>

            <div className="text-sm text-gray-400">{film.year}</div>

            {film.rating && (
              <div className="text-yellow-400 text-sm font-medium">
                Rating: {film.rating}
              </div>
            )}

            <div className="text-xs text-gray-500 line-clamp-1">
              {film.genres.join(", ")}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
