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
  favorite: number[]
  series: Movie[]
}
