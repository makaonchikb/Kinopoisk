//Короткая инфомрация о фильме
export type MovieShort = {
  id: number
  title: string
  poster: string
  year: number
  rating: number | null
  genres: string[]
  countries: string[]
}

//Полная информация о фильме
export interface MovieFull {
  kinopoiskId: number
  nameRu: string | null
  nameEn: string | null
  nameOriginal: string | null
  type: string
  year: number | null
  posterUrl: string
  posterUrlPreview: string
  ratingKinopoisk: number | null
  ratingImdb: number | null
  genres: { genre: string }[]
  countries: { country: string }[]
  description: string
  shortDescription?: string
  slogan?: string
  filmLength?: number
  ratingAgeLimits?: string
  ratingKinopoiskVoteCount?: number
  webUrl?: string
}

//Список фильмов
export type MoviesListState = {
  data: MovieShort[]
  series: MovieShort[]
  loading: boolean
  error: boolean
  totalPages: number
  seriesTotalPages: number
  searchResults: MovieShort[]
  searchTotalPages: number
  filteredMovies: MovieShort[]
  filteredTotalPages: number
}

//Страница фильмов
export type MovieDetailsState = {
  currentFilm: MovieFull | null
  currentFilmActors: any[]
  currentFilmImages: any[]
  currentFilmSimilar: any[]
  loading: boolean
  error: boolean
}

//Избранное
export type FavoritesState = {
  favorite: number[]
  favoriteMovies: MovieShort[]
  loading: boolean
  error: boolean
}

//Api ответы
export interface FilmsResponse {
  total: number
  totalPages: number
  items: MovieFull[]
}

export interface FilmItem {
  kinopoiskId: number
  nameRu: string | null
  nameEn: string | null
  nameOriginal: string | null
  type: string
  year: number | null
  posterUrl: string
  posterUrlPreview: string
  ratingKinopoisk: number | null
  ratingImdb: number | null
  genres: { genre: string }[]
  countries: { country: string }[]
  description: string
}

//Авторизация
export interface FormSignUpValues {
  username: string
  email: string
  password: string
  confirmPassword: string
}

export interface FormSignInValues {
  email: string
  password: string
}

export type SignInData = FormSignInValues

export interface AuthState {
  user: UserModel | null
  AboutUser: AboutUserData | null
  jwt: JwtModel | null
  isActivated: boolean
  loading: boolean
  error: boolean
}

export interface UserModel {
  id: number
  username: string
  email: string
  course_group: number
}

export interface JwtModel {
  access: string
  refresh: string
}

export type SignUpData = {
  username: string
  email: string
  password: string
  course_group?: string
}

export interface ActivateData {
  uid: string
  token: string
}

export interface AboutUserData {
  username: string
  id: number
  email: string
}

export type FormFieldProps = {
  id?: string
  label?: string
  type: string
  placeholder?: string
  className: string
  classNameForLabel?: string
  maxLength?: number
  max?: number | string
  min?: number | string
  step?: string
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
}
