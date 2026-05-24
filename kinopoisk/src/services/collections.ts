import { get } from "../config/http-client-kinopoisk";
import { API } from "../config/api";
import { FilmsResponse } from "../types/types";

export async function requestCollection(
  type: string,
  page: number
): Promise<FilmsResponse> {
  const response = await get(`${API.films}/collections`, {
    params: {
      type,
      page,
    },
  });

  return response.data;
}
