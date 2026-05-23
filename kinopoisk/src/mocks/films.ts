import { Film } from "../types/types";

export const mockFilms: Film[] = Array.from({ length: 10 }).map((_, i) => ({
  id: i + 1,
  title: `Фильм №${i + 1}`,
  poster: "https://via.placeholder.com/300x450?text=Poster",
  rating: 8.1,
}));
