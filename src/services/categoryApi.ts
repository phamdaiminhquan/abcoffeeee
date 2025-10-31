import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
});

export interface Category {
  _id: string;
  name: string;
}

export const getCategories = async (): Promise<Category[]> => {
  try {
    const response = await API.get<Category[]>(`/category`);
    return response.data;
  } catch (error) {
    console.error("getCategories err:", error);
    return [];
  }
};
