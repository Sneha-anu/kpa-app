import axios from "axios";

axios.defaults.baseURL = "http://localhost:4200";

export function fetchUserProfile() {
  return axios.get("/profile");
}

export function fetchKPAstages() {
  return axios.get("/kpacreation");
}

export function updateUserProfile(url, data) {
  return axios.patch(url, data);
}
