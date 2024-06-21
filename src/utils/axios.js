import axios from "axios";

// Create an axios instance
const quizAppInstance = axios.create({
  baseURL: "https://two4-mintep1-app-dev.onrender.com/api/v1", 
  timeout: 100000,
});

export { quizAppInstance };