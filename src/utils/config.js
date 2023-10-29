import axios, { AxiosInstance } from "axios";
import { persistor, store } from "../redux/store";
import { Platform } from "react-native";
// import { doLogoutThings } from "../services/auth.service";
import { BASE_URL } from "../config";

const HTTP_CLIENT = axios.create({
  baseURL: BASE_URL,
});

const initialConfig = () => {
  setupAxios();
};

const setupAxios = () => {
  HTTP_CLIENT.interceptors.request.use(
    (config) => {
      const user = store.getState().root.user;
      if (user && user?.token && config.headers) {
        config.headers.Authorization = `Bearer ${user?.token}`;
      }
      return config;
    },
    (err) => {
      console.log("errerrerrerr  ininini ", err);

      Promise.reject(err);
    }
  );

  HTTP_CLIENT.interceptors.response.use(
    (sucs) => {
      return sucs;
    },
    (err) => {
      console.log("errerrerrerr  ininini ", err);

      if (err?.response?.status === 401 || err?.status === 401) {
        let { user } = store.getState().root?.user?.user;
      }
      console.log("errerrerrerr  ininini ", err);
      Promise.reject(err);
    }
  );
};

export { HTTP_CLIENT, initialConfig };
