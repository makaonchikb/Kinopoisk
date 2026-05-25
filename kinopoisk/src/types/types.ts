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
  currentFilm: FilmItem | null
  currentFilmActors: any[]
  currentFilmImages: any[]
  currentFilmSimilar: any[]
  favoriteMovies: any[]
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
  description: string;
}

export interface FormSignUpValues {
  username: string,
  email: string,
  password: string,
  confirmPassword: string
}

export interface FormSignInValues {
  email: string,
  password: string
}

export type SignInData = FormSignInValues

export interface AuthState {
  user: UserModel | null,
  AboutUser: AboutUserData | null,
  jwt: JwtModel | null,
  isActivated: boolean,
  loading: boolean,
  error: boolean,
}

export interface UserModel {
  id: number
  username: string,
  email: string,
  course_group: number
}

export interface JwtModel {
  access: string,
  refresh: string,
}

export type SignUpData = {
  username: string
  email: string
  password: string
  course_group?: string
}

export interface ActivateData {
  uid: string,
  token: string
}

export interface AboutUserData {
  username: string,
  id: number,
  email: string
}

export type FormFieldProps = {
  id?: string,
  label?: string,
  type: string,
  placeholder?: string,
  className: string,
  classNameForLabel?: string,
  maxLength?: number,
  max?: number | string,
  min?: number | string,
  step?: string,
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
}
