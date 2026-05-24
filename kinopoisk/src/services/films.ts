import { get } from "../config/http-client-kinopoisk";
import { API } from "../config/api";
import { FilmsResponse, FilmItem } from "../types/types";

export async function requestMovies(page: number): Promise<FilmsResponse> {
  const response = await get(API.films, {
    params: { page }
  });
  return response.data;
}

export async function requestSeries(page: number): Promise<FilmsResponse> {
  const response = await get(API.films, {
    params: { type: "TV_SERIES", page }
  });
  return response.data;
}

export async function requestFilm(id: number): Promise<FilmItem> {
  const response = await get(`${API.films}/${id}`);
  return response.data;
}

export async function requestSearchMovies(query: string, page: number) {
  const response = await get(API.films, {
    params: {
      keyword: query,
      page: page
    }
  });
  return response.data;
}

export interface MoviesFilterParameters {
  selectedCountryIdentifier: number | null;
  selectedGenreIdentifier: number | null;
  selectedMovieType: string | null;
  selectedSortingOrder: string | null;
  minimumRatingValue: number | null;
  maximumRatingValue: number | null;
  minimumYearValue: number | null;
  maximumYearValue: number | null;
  currentPageNumber: number;
}

export async function requestFilteredMovies(
  moviesFilterParameters: MoviesFilterParameters
): Promise<FilmsResponse> {
  const response = await get(API.films, {
    params: {
      countries: moviesFilterParameters.selectedCountryIdentifier ?? undefined,
      genres: moviesFilterParameters.selectedGenreIdentifier ?? undefined,
      type: moviesFilterParameters.selectedMovieType ?? undefined,
      order: moviesFilterParameters.selectedSortingOrder ?? undefined,
      ratingFrom: moviesFilterParameters.minimumRatingValue ?? undefined,
      ratingTo: moviesFilterParameters.maximumRatingValue ?? undefined,
      yearFrom: moviesFilterParameters.minimumYearValue ?? undefined,
      yearTo: moviesFilterParameters.maximumYearValue ?? undefined,
      page: moviesFilterParameters.currentPageNumber ?? 1
    }
  });

  return response.data;
}
