import axios from "axios";

export const api = axios.create({
  baseURL: "http://192.168.1.42:8080",  
  timeout: 10000,
});

