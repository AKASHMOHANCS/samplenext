export default function handler(req, res) {
  res.status(200).json({ name: "John Doe" });
}
import axios from "axios";

const BASE_URL = process.env.BASE_URL;

export const getAxiosInstance = async () => {
  const instance = axios.create({
    baseURL: BASE_URL,
    headers: {
      Accept: "application/json",
    },
  });
  instance.interceptors.request.use(
    function (response) {
      return response;
    },
    function (error) {
      return Promise.reject(error);
    }
  );

  return instance;
};
