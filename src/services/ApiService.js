import axios from "axios";

export class ApiService {
  constructor() {
    this.client = axios.create({
      baseURL: "http://localhost:8000/api",
    });
  }
}

export const apiService = new ApiService();
