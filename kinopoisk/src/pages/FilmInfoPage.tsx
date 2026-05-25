import React, { useEffect } from "react";
import { useParams, Link } from "react-router";
import { useAppDispatch, useAppSelector } from "../redux/store";
import {
  fetchMovieById,
  fetchFilmActors,
  fetchFilmImages,
  fetchSimilarMovies,
  clearCurrentFilm
} from "../redux/movie-slice";
import { toggleFavoriteMovie } from "../redux/favorite-slice";
import ImageSlider from "../components/slider";

export function FilmInfo(): React.ReactElement {
  const { id } = useParams();
  const dispatch = useAppDispatch();

  const film = useAppSelector((state) => state.movie.currentFilm);
  const actors = useAppSelector((state) => state.movie.currentFilmActors) ?? [];
  const images = useAppSelector((state) => state.movie.currentFilmImages) ?? [];
  const similar = useAppSelector((state) => state.movie.currentFilmSimilar) ?? [];
  const favorite = useAppSelector((state) => state.favorites.favorite);

  useEffect(() => {
    dispatch(clearCurrentFilm());
    dispatch(fetchMovieById(Number(id)));
    dispatch(fetchFilmActors(Number(id)));
    dispatch(fetchFilmImages(Number(id)));
    dispatch(fetchSimilarMovies(Number(id)));
  }, [dispatch, id]);

  if (!film) {
    return <div className="text-gray-300 p-6">Загрузка...</div>;
  }

  const uniqueActors = Array.from(
    new Map(actors.map((a) => [a.staffId, a])).values()
  ).slice(0, 12);

  const imagesToShow = images.slice(0, 12);
  const similarToShow = similar.slice(0, 12);

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-12">
      <div className="flex flex-col md:flex-row gap-8">
        <img
          src={film.posterUrl}
          alt={film.nameRu || film.nameEn || film.nameOriginal || ""}
          className="w-72 h-[420px] object-cover rounded-lg shadow-lg"
        />

        <div className="space-y-4 flex-1">
          <h1 className="text-4xl font-bold text-gray-200">
            {film.nameRu || film.nameEn || film.nameOriginal}
          </h1>

          <button
            onClick={() => dispatch(toggleFavoriteMovie(film.kinopoiskId))}
            className="px-4 py-2 rounded-lg bg-yellow-500 text-black font-bold"
          >
            {favorite.includes(film.kinopoiskId)
              ? "Удалить из избранного"
              : "В избранное"}
          </button>

          <div className="text-gray-300 text-lg">
            <span className="text-gray-400">Год:</span> {film.year ?? "—"}
          </div>

          <div className="text-gray-300 text-lg">
            <span className="text-gray-400">Тип:</span> {film.type}
          </div>

          <div className="text-gray-300 text-lg">
            <span className="text-gray-400">Рейтинг KP:</span>{" "}
            {film.ratingKinopoisk ?? "—"}
          </div>

          <div className="text-gray-300 text-lg">
            <span className="text-gray-400">IMDb:</span>{" "}
            {film.ratingImdb ?? "—"}
          </div>

          {film.description && (
            <div className="text-gray-300 text-lg leading-relaxed">
              {film.description}
            </div>
          )}
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl text-gray-200 font-bold">Актёры</h2>

        {uniqueActors.length === 0 ? (
          <div className="text-gray-400 text-lg">Информация об актёрах отсутствует.</div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {uniqueActors.map((actor) => (
              <div key={actor.staffId} className="text-center">
                <img
                  src={actor.posterUrl}
                  className="w-32 h-40 object-cover rounded-lg mx-auto"
                />
                <div className="text-gray-200 mt-2">
                  {actor.nameRu || actor.nameEn}
                </div>
                <div className="text-gray-400 text-sm">{actor.professionText}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl text-gray-200 font-bold">Кадры</h2>
        <ImageSlider images={imagesToShow} />
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl text-gray-200 font-bold">Похожие фильмы</h2>

        {similarToShow.length === 0 ? (
          <div className="text-gray-400 text-lg">Похожие фильмы не найдены.</div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {similarToShow.map((movie) => (
              <Link
                key={movie.filmId}
                to={`/film/${movie.filmId}`}
                className="text-center cursor-pointer block"
              >
                <img
                  src={movie.posterUrlPreview}
                  className="w-32 h-40 object-cover rounded-lg mx-auto"
                />
                <div className="text-gray-200 mt-2">
                  {movie.nameRu || movie.nameEn}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
