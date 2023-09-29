import axios from "axios";

import { PaginationQuery } from "../types/certificate";

const baseURL =
  process.env.REACT_APP_SERVER_URL || "https://demo.api.agreena.com/api/";
const accessToken = process.env.REACT_APP_ACCESS_TOKEN;

const axiosInstance = axios.create({
  baseURL,
  headers: { "API-ACCESS-TOKEN": accessToken },
});

const fetchCertificates = ({ page, limit }: PaginationQuery) => {
  return axiosInstance.get(
    `/public/carbon_registry/v1/certificates?includeMeta=true&page=${page}&limit=${limit}`
  );
};

export { fetchCertificates };
