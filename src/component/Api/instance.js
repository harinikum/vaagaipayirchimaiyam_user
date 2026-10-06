import axios from "axios";

// Function to create axios instance with dynamic headers
const createAxiosInstance = () => {
  const tokenData = localStorage.getItem("token");

  const instance = axios.create({
    baseURL: "https://vaagaimaiyam.vebbox.in/vaagaibackend/controllers/api/User/",
    // baseURL: "https://vaagaimaiyam.vebbox.in/vaagaibackend/controllers/api/User/",
    headers: {
      Authorization: `Bearer ${tokenData}`,
    },
  });

  //   // Add a request interceptor to update the Authorization header
  instance.interceptors.request.use(
    (config) => {
      const updatedToken = localStorage.getItem("token");
      // console.log("Updated Token:", updatedToken);
      if (updatedToken) {
        config.headers.Authorization = `Bearer ${updatedToken}`;
      }
      return config;
    },
    (error) => {
      console.error("Request Interceptor Error:", error);
      return Promise.reject(error);
    }
  );


  return instance;
};

// // Create axios instance
export const axiosInstance = createAxiosInstance();

