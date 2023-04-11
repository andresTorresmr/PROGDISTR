import axios from "axios";

const api = axios.create({
  baseURL: `https://localhost:44379/api/`,
  timeout: 1000,
});
export default api;
