import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL
});

api.interceptors.response.use(
  response => response,
  error => error.response
);

export default api;
