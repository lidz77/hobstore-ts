import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

const createAxiosInstance = (): AxiosInstance => {
  const config: AxiosRequestConfig = {
    // baseURL: "http://localhost:3084/api",
    baseURL:
      "http://ec2-13-250-98-155.ap-southeast-1.compute.amazonaws.com:3084/api",
    // baseURL: "http://ec2-54-152-96-109.compute-1.amazonaws.com/:3084/api",
    headers: {
      "Content-type": "application/json",
    },
  };
  return axios.create(config);
};

export default createAxiosInstance();
