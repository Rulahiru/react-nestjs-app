import axios, {
  AxiosError,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from "axios";
import { showErrorToastMsg } from "../../utility/ToastMessage";

const api = axios.create({
  baseURL: "http://localhost:3000",
});

let logoutFunction: (() => void) | null = null;

export const setLogoutHandler = (logoutFn: () => void) => {
  logoutFunction = logoutFn;
};

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem("token");

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error: AxiosError) => {
    if (!error.response) {
      showErrorToastMsg("Network error. Please try again.");
      return Promise.reject(error);
    }

    if (error.response.status !== 401) {
      showErrorToastMsg("Something went wrong.");
      return Promise.reject(error);
    }

    showErrorToastMsg("Session expired. Please log in again.");
    localStorage.removeItem("token");

    if (logoutFunction) {
      logoutFunction();
    }

    return Promise.reject(error); // ✅ important
  }
);

export default api;