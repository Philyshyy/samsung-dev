import { Series } from "@prisma/client";
import { axiosInstance } from "./axios";
import { ApiRoutes } from "./constants";

export const getAll = async (): Promise<Series[]> => {
  return (await axiosInstance.get<Series[]>(ApiRoutes.SERIES)).data;
};
