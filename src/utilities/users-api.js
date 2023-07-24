import sendRequest from "./send-request";
const BASE_URL = "/api/users";

export function signUp(userData) {
  return sendRequest(BASE_URL, "POST", userData);
}

export function login(credentials) {
  return sendRequest(`${BASE_URL}/login`, "POST", credentials);
}

export function updateFirstName(userId, firstName) {
  return sendRequest(`${BASE_URL}/${userId}/firstName`, "PUT", firstName);
}

export function updateLastName(userId, lastName) {
  return sendRequest(`${BASE_URL}/${userId}/lastName`, "PUT", lastName);
}

export function updateEmail(userId, email) {
  return sendRequest(`${BASE_URL}/${userId}/email`, "PUT", email);
}

export function updatePassword(userId, password) {
  return sendRequest(`${BASE_URL}/${userId}/password`, "PUT", password);
}

export function checkToken() {
  return sendRequest(`${BASE_URL}/check-token`);
}
