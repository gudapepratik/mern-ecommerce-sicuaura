import axios from "axios";
import config from "../config/config";

// Create an Axios instance
const httpClient = axios.create({
  baseURL: config.backendApiBaseUrl || "http://localhost:8000",
  withCredentials: true, // Send cookies with requests
  headers: {
    "Content-Type": "application/json",
  },
});

export default httpClient;
