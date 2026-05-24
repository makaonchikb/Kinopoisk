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
  const response = await get(API.filmsSearch, {
    params: {
      keyword: query,
      page
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

export async function requestFilmImages(id: number) {
  const types = ["STILL", "SHOOTING", "POSTER", "FAN_ART"];

  const requests = types.map(type =>
    get(`/api/v2.2/films/${id}/images`, { params: { type } })
      .then(res => res.data.items ?? [])
      .catch(() => [])
  );

  const results = await Promise.all(requests);

  const merged = results.flat();

  const unique = Array.from(
    new Map(merged.map(img => [img.imageUrl, img])).values()
  );

  return unique.map(img => ({
    imageUrl: img.previewUrl || img.imageUrl
  }));
}



export async function requestFilmStaff(filmId: number) {
  const response = await get(API.staff, {
    params: { filmId }
  });
  return response.data;
}

export async function requestSimilarMovies(id: number) {
  const response = await get(`/api/v2.2/films/${id}/similars`);
  return response.data.items ?? [];
}
