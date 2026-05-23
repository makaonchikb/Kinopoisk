import React from "react";

const collections = [
  { type: "TOP_POPULAR_ALL", title: "Популярное" },
  { type: "TOP_POPULAR_MOVIES", title: "Популярные фильмы" },
  { type: "TOP_250_MOVIES", title: "Топ 250 фильмов" },
  { type: "TOP_250_TV_SHOWS", title: "Топ 250 сериалов" },
  { type: "POPULAR_SERIES", title: "Популярные сериалы" },
  { type: "VAMPIRE_THEME", title: "Фильмы про вампиров" },
  { type: "ZOMBIE_THEME", title: "Фильмы про зомби" },
  { type: "COMICS_THEME", title: "Фильмы по комиксам" },
  { type: "LOVE_THEME", title: "Романтика" },
  { type: "CATASTROPHE_THEME", title: "Катастрофы" },
  { type: "KIDS_ANIMATION_THEME", title: "Детская анимация" },
  { type: "FAMILY", title: "Семейные фильмы" },
  { type: "OSKAR_WINNERS_2021", title: "Оскар 2021" },
  { type: "CLOSES_RELEASES", title: "Скоро в кино" }
];

export function CollectionsPage(): React.ReactElement {
  return (
    <div className="px-4 py-10">
      <h1 className="text-2xl font-semibold text-gray-200 mb-6">Подборки</h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {collections.map((item) => (
          <div
            key={item.type}
            className="bg-neutral-900/80 border border-white/10 rounded-lg p-6 cursor-pointer hover:bg-white/5 transition"
          >
            <div className="text-gray-200 text-lg font-medium">{item.title}</div>
            <div className="text-gray-500 text-sm mt-1">{item.type}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
