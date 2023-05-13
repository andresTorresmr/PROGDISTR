import axios from "axios";

const token = localStorage.getItem("access_token");
axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
const api = axios.create({
  baseURL: `https://localhost:7136/api/`,
  timeout: 1000,
});
export default api;
