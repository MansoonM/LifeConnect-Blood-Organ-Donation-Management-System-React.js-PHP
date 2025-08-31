import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost/backend-php/api",
  withCredentials: true
});

export default api;
