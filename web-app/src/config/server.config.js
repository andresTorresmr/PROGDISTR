import axios from "axios";

const api = axios.create({
  baseURL: "https://localhost:7136/api/",
  timeout: 1000,
});
export default api;
