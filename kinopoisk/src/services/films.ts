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
      page: page,
    },
  });

  return response.data;
}
