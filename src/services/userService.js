import http from "./httpService";

const apiUsers = '/users';

export function register(user) {
  return http.post(apiUsers, {
    email: user.username,
    password: user.password,
    name: user.name
  });
}
