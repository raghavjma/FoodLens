import axios from "axios";

const api = axios.create ({ // Create an axios instance with a base URL
  baseURL: "http://localhost:5000/api",
  withCredentials: true, // Include cookies in requests for authentication
});

export default api;