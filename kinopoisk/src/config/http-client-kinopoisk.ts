import axios from "axios";
import { baseUrlKinopoisk } from "./api";

const apiKey = import.meta.env.VITE_KP_API_KEY;

export const kinopoiskHttpClient = axios.create({
  baseURL: baseUrlKinopoisk,
  headers: {
    "X-API-KEY": apiKey,
    "Content-Type": "application/json",
  },
});

kinopoiskHttpClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("Kinopoisk API error:", error);
    throw error;
  }
);

export const get = kinopoiskHttpClient.get;
export const post = kinopoiskHttpClient.post;
