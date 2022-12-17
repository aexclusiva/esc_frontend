import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_API_URL,
  withCredentials: true,
  headers: {'Content-Type': 'application/json'}
});

export default api;