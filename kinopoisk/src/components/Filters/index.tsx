import React from "react";
import { useNavigate } from "react-router";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import {
  setSelectedGenreIdentifier,
  setSelectedCountryIdentifier,
  setSelectedMovieType,
  setSelectedSortingOrder,
  setMinimumRatingValue,
  setMaximumRatingValue,
  setMinimumYearValue,
  setMaximumYearValue
} from "../../redux/filters-slice";

export function FiltersSidebar(): React.ReactElement {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const moviesFilterState = useAppSelector((state) => state.filters);

  function applyFilters() {
    navigate("/films/filters/1");
  }

  return (
    <aside className="sticky top-20 self-start w-64 bg-neutral-900/80 border-r border-white/10 p-4 space-y-6 rounded-lg">

      <div>
        <h3 className="text-gray-300 text-sm font-semibold mb-2">Жанр</h3>
        <select
          value={moviesFilterState.selectedGenreIdentifier ?? ""}
          onChange={(event) =>
            dispatch(setSelectedGenreIdentifier(event.target.value ? Number(event.target.value) : null))
          }
          className="w-full bg-neutral-800 text-gray-300 px-3 py-2 rounded-md border border-white/10 outline-none"
        >
          <option value="">Все жанры</option>
          <option value="1">Боевик</option>
          <option value="2">Комедия</option>
          <option value="3">Драма</option>
        </select>
      </div>

      <div>
        <h3 className="text-gray-300 text-sm font-semibold mb-2">Страна</h3>
        <select
          value={moviesFilterState.selectedCountryIdentifier ?? ""}
          onChange={(event) =>
            dispatch(setSelectedCountryIdentifier(event.target.value ? Number(event.target.value) : null))
          }
          className="w-full bg-neutral-800 text-gray-300 px-3 py-2 rounded-md border border-white/10 outline-none"
        >
          <option value="">Все страны</option>
          <option value="1">США</option>
          <option value="2">Россия</option>
          <option value="3">Франция</option>
        </select>
      </div>

      <div>
        <h3 className="text-gray-300 text-sm font-semibold mb-2">Тип</h3>
        <select
          value={moviesFilterState.selectedMovieType ?? ""}
          onChange={(event) =>
            dispatch(setSelectedMovieType(event.target.value || null))
          }
          className="w-full bg-neutral-800 text-gray-300 px-3 py-2 rounded-md border border-white/10 outline-none"
        >
          <option value="">Все</option>
          <option value="FILM">Фильмы</option>
          <option value="TV_SERIES">Сериалы</option>
          <option value="TV_SHOW">ТВ-шоу</option>
          <option value="MINI_SERIES">Мини-сериалы</option>
        </select>
      </div>

      <div>
        <h3 className="text-gray-300 text-sm font-semibold mb-2">Сортировка</h3>
        <select
          value={moviesFilterState.selectedSortingOrder}
          onChange={(event) =>
            dispatch(setSelectedSortingOrder(event.target.value as any))
          }
          className="w-full bg-neutral-800 text-gray-300 px-3 py-2 rounded-md border border-white/10 outline-none"
        >
          <option value="RATING">По рейтингу</option>
          <option value="NUM_VOTE">По числу голосов</option>
          <option value="YEAR">По году</option>
        </select>
      </div>

      <div>
        <h3 className="text-gray-300 text-sm font-semibold mb-2">Рейтинг KP</h3>
        <div className="flex gap-2">
          <input
            type="number"
            value={moviesFilterState.minimumRatingValue ?? ""}
            onChange={(event) =>
              dispatch(setMinimumRatingValue(event.target.value ? Number(event.target.value) : null))
            }
            placeholder="От"
            className="w-1/2 bg-neutral-800 text-gray-300 px-3 py-2 rounded-md border border-white/10 outline-none"
          />
          <input
            type="number"
            value={moviesFilterState.maximumRatingValue ?? ""}
            onChange={(event) =>
              dispatch(setMaximumRatingValue(event.target.value ? Number(event.target.value) : null))
            }
            placeholder="До"
            className="w-1/2 bg-neutral-800 text-gray-300 px-3 py-2 rounded-md border border-white/10 outline-none"
          />
        </div>
      </div>

      <div>
        <h3 className="text-gray-300 text-sm font-semibold mb-2">Год</h3>
        <div className="flex gap-2">
          <input
            type="number"
            value={moviesFilterState.minimumYearValue ?? ""}
            onChange={(event) =>
              dispatch(setMinimumYearValue(event.target.value ? Number(event.target.value) : null))
            }
            placeholder="От"
            className="w-1/2 bg-neutral-800 text-gray-300 px-3 py-2 rounded-md border border-white/10 outline-none"
          />
          <input
            type="number"
            value={moviesFilterState.maximumYearValue ?? ""}
            onChange={(event) =>
              dispatch(setMaximumYearValue(event.target.value ? Number(event.target.value) : null))
            }
            placeholder="До"
            className="w-1/2 bg-neutral-800 text-gray-300 px-3 py-2 rounded-md border border-white/10 outline-none"
          />
        </div>
      </div>

      <button
        onClick={applyFilters}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition"
      >
        Применить
      </button>

    </aside>
  );
}
