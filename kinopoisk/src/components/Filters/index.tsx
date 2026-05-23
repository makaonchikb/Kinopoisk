import React from "react";

export function FiltersSidebar(): React.ReactElement {
  return (
    <aside className="w-64 bg-neutral-900/80 border-r border-white/10 p-4 space-y-6 rounded-lg">

      <div>
        <h3 className="text-gray-300 text-sm font-semibold mb-2">Жанр</h3>
        <select className="w-full bg-neutral-800 text-gray-300 px-3 py-2 rounded-md border border-white/10 outline-none">
          <option value="">Все жанры</option>
          <option value="1">Боевик</option>
          <option value="2">Комедия</option>
          <option value="3">Драма</option>
        </select>
      </div>

      <div>
        <h3 className="text-gray-300 text-sm font-semibold mb-2">Страна</h3>
        <select className="w-full bg-neutral-800 text-gray-300 px-3 py-2 rounded-md border border-white/10 outline-none">
          <option value="">Все страны</option>
          <option value="1">США</option>
          <option value="2">Россия</option>
          <option value="3">Франция</option>
        </select>
      </div>

      <div>
        <h3 className="text-gray-300 text-sm font-semibold mb-2">Тип</h3>
        <select className="w-full bg-neutral-800 text-gray-300 px-3 py-2 rounded-md border border-white/10 outline-none">
          <option value="ALL">Все</option>
          <option value="FILM">Фильмы</option>
          <option value="TV_SERIES">Сериалы</option>
          <option value="TV_SHOW">ТВ-шоу</option>
          <option value="MINI_SERIES">Мини-сериалы</option>
        </select>
      </div>

      <div>
        <h3 className="text-gray-300 text-sm font-semibold mb-2">Сортировка</h3>
        <select className="w-full bg-neutral-800 text-gray-300 px-3 py-2 rounded-md border border-white/10 outline-none">
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
            placeholder="От"
            className="w-1/2 bg-neutral-800 text-gray-300 px-3 py-2 rounded-md border border-white/10 outline-none"
          />
          <input
            type="number"
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
            placeholder="От"
            className="w-1/2 bg-neutral-800 text-gray-300 px-3 py-2 rounded-md border border-white/10 outline-none"
          />
          <input
            type="number"
            placeholder="До"
            className="w-1/2 bg-neutral-800 text-gray-300 px-3 py-2 rounded-md border border-white/10 outline-none"
          />
        </div>
      </div>

    </aside>
  );
}
