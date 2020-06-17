import http from "./httpService";
import { apiUrl } from "../config.json";

const apiGenres = apiUrl + '/genres';

export async function getGenres() {
  const { data: genres } = await http.get(apiGenres);
  return genres;
}

export async function getGenresExtended() {
  const { data: genres } = await http.get(apiGenres);
  return [{ _id: 0, name: "All Genres" }, ...genres];
}