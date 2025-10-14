import axios from "axios";

const apiServices = axios.create({
  baseURL : import.meta.env.VITE_BASE_URL,
  headers : {
    "Content-Type" : "application/json",
  },
});

export default apiServices;