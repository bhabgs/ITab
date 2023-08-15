import axios from "axios";

export interface CommonRes<T> {
  data: T;
  url: string;
  date: number;
}

const instance = axios.create({
  baseURL: "/api/",
  timeout: 1000 * 10,
});

instance.interceptors.request.use(
  (config) => {
    return config;
  },
  (err) => {
    return err;
  }
);

instance.interceptors.response.use(
  (res) => {
    return Promise.resolve(res.data);
  },
  (err) => {
    return Promise.reject(err);
  }
);

export default instance;
