import axios from "axios";

const api = axios.create({
  baseURL: "https://escola360-server.onrender.com",
});

/*const api = axios.create({
   baseURL: "https://escola360-server.onrender.com",
});
*/

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("userToken");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;
