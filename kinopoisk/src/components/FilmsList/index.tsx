import { Film } from "@/types/types";

type FilmsListProps = {
  films: Film[];
};

export function FilmsList({ films }: FilmsListProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
      {films.map((film) => (
        <div key={film.id} className="bg-white/5 rounded-lg">
          <img src={film.poster} className="w-full h-60 object-cover" />
          <div className="p-3 text-gray-300">{film.title}</div>
        </div>
      ))}
    </div>
  );
}
