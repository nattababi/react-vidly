import http from "./httpService";
import { apiUrl } from "../config.json";

const apiUsers = apiUrl + '/users';

export function register(user) {
  return http.post(apiUsers, {
    email: user.username,
    password: user.password,
    name: user.name
  });
}
