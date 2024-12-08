import axios from "axios";

// Tạo một axios instance
export const externalApi = axios.create({
  baseURL: "https://provinces.open-api.vn/api/",
  headers: {
    "Content-Type": "application/json",
  },
});

