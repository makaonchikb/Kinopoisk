import React, { useEffect } from "react";
import { useParams } from "react-router";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { fetchMovieById } from "../redux/movies-slice";

export function FilmInfo(): React.ReactElement {
  const { id } = useParams();
  const dispatch = useAppDispatch();

  const movie = useAppSelector((state) =>
    state.movies.data.find((film) => film.id === Number(id))
  );

  useEffect(() => {
    if (!movie) {
      dispatch(fetchMovieById(Number(id)));
    }
  }, [dispatch, id, movie]);

  if (!movie) {
    return <div className="text-gray-300 p-6">Загрузка...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-10">

      {/* Верхний блок */}
      <div className="flex flex-col md:flex-row gap-8">

        <img
          src={movie.poster}
          alt={movie.title}
          className="w-72 h-[420px] object-cover rounded-lg shadow-lg"
        />

        <div className="space-y-4 flex-1">

          <h1 className="text-4xl font-bold text-gray-200">
            {movie.nameRu || movie.nameEn || movie.nameOriginal}
          </h1>

          {movie.nameOriginal && movie.nameOriginal !== movie.nameRu && (
            <div className="text-gray-400 italic">{movie.nameOriginal}</div>
          )}

          <div className="text-gray-300 text-lg">
            <span className="text-gray-400">Год:</span> {movie.year ?? "—"}
          </div>

          <div className="text-gray-300 text-lg">
            <span className="text-gray-400">Тип:</span> {movie.type}
          </div>

          <div className="text-gray-300 text-lg">
            <span className="text-gray-400">Рейтинг KinoPoisk</span>{" "}
            {movie.ratingKinopoisk ?? ":"}
          </div>

          <div className="text-gray-300 text-lg">
            <span className="text-gray-400">IMDb:</span>{" "}
            {movie.ratingImdb ?? ":"}
          </div>

          <div className="text-gray-300 text-lg">
            <span className="text-gray-400">Жанры:</span>{" "}
            {movie.genres.map((g) => g.genre).join(", ")}
          </div>

          <div className="text-gray-300 text-lg">
            <span className="text-gray-400">Страны:</span>{" "}
            {movie.countries.map((c) => c.country).join(", ")}
          </div>

        </div>
      </div>

      {/* Описание — если появится в API */}
      <div className="text-gray-400 text-center">
        Дополнительная информация о фильме появится, когда мы расширим API.
      </div>

    </div>
  );
}
