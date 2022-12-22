import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

const createAxiosInstance = (): AxiosInstance => {
  const config: AxiosRequestConfig = {
    baseURL: "http://localhost:3084/api",
    headers: {
      "Content-type": "application/json",
    },
  };
  return axios.create(config);
};

export default createAxiosInstance();
