export type Film = {
  id: number;
  title: string;
  poster: string;
  rating: number;
};

export type Movie = {
  id: number
  title: string
  poster: string
  year: number
  rating: number | null
  genres: string[]
  countries: string[]
}

export type MoviesState = {
  data: Movie[]
  loading: boolean
  error: boolean
  totalPages: number
  seriesTotalPages: number
  favorite: number[]
  series: Movie[]
  searchResults: Movie[]
  searchTotalPages: number
  filteredMovies: Movie[]
  filteredTotalPages: number
  currentTotalPages: number
}

export interface FilmsResponse {
  total: number;
  totalPages: number;
  items: FilmItem[];
}

export interface FilmItem {
  kinopoiskId: number;
  nameRu: string | null;
  nameEn: string | null;
  nameOriginal: string | null;
  type: string;
  year: number | null;
  posterUrl: string;
  posterUrlPreview: string;
  ratingKinopoisk: number | null;
  ratingImdb: number | null;
  genres: { genre: string }[];
  countries: { country: string }[];
}


