import * as usersAPI from "./users-api";

export async function signUp(userData) {
  const token = await usersAPI.signUp(userData);
  localStorage.setItem("token", token);
  return getUser();
}

export async function login(credentials) {
  const token = await usersAPI.login(credentials);
  localStorage.setItem("token", token);
  return getUser();
}

export async function updateFirstName(userId, firstName) {
  const token = await usersAPI.updateFirstName(userId, firstName);
  localStorage.removeItem("token");
  localStorage.setItem("token", token);
  return getUser();
}

export async function updateLastName(userId, lastName) {
  const token = await usersAPI.updateLastName(userId, lastName);
  localStorage.removeItem("token");
  localStorage.setItem("token", token);
  return getUser();
}

export async function updateEmail(userId, email) {
  const token = await usersAPI.updateEmail(userId, email);
  localStorage.removeItem("token");
  localStorage.setItem("token", token);
  return getUser();
}

export async function updatePassword(userId, password) {
  const token = await usersAPI.updatePassword(userId, password);
  localStorage.removeItem("token");
  localStorage.setItem("token", token);
  return getUser();
}

export function logOut() {
  localStorage.removeItem("token");
}

export function getToken() {
  const token = localStorage.getItem("token");
  if (!token) return null;
  const payload = JSON.parse(atob(token.split(".")[1]));
  if (payload.exp < Date.now() / 1000) {
    localStorage.removeItem("token");
    return null;
  }
  return token;
}

export function getUser() {
  const token = getToken();
  return token ? JSON.parse(atob(token.split(".")[1])).user : null;
}

export function checkToken() {
  return usersAPI.checkToken().then((dateStr) => new Date(dateStr));
}
