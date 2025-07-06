import axios from "axios";
import { BASE_URL } from "./constant";
import { removeUser } from "./userSlice";
import { removeFeed } from "./feedSlice";
import { resetGlobal } from "./globalSlice";
import { appStore } from "./appStore";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true
});

// Response interceptor to handle 401 errors
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      // Clear all store data
      appStore.dispatch(removeUser());
      appStore.dispatch(removeFeed());
      appStore.dispatch(resetGlobal());
      
      // Only redirect if not already on login/signup page
      const currentPath = window.location.pathname;
      if (currentPath !== '/login' && currentPath !== '/signup') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;