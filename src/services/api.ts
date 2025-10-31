import axios, { AxiosError } from 'axios';
import { Category, Product } from '../types';

// Base URL from environment variable
export const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: baseUrl,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Error handling helper
export interface ApiError {
  status: number;
  message: string;
  originalError?: unknown;
}

function handleApiError(error: unknown): ApiError {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError;
    const responseData = axiosError.response?.data as { message?: string } | undefined;
    return {
      status: axiosError.response?.status || 0,
      message: responseData?.message || axiosError.message || 'Network error occurred',
      originalError: error,
    };
  }
  return {
    status: 500,
    message: 'An unexpected error occurred',
    originalError: error,
  };
}

// Categories API
export async function getCategories(): Promise<Category[]> {
  try {
    const { data } = await api.get<Category[]>('/categories');
    return data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    const apiError = handleApiError(error);
    throw apiError;
  }
}

export async function getCategoryById(id: number): Promise<Category> {
  try {
    const { data } = await api.get<Category>(`/categories/${id}`);
    return data;
  } catch (error) {
    console.error(`Error fetching category ${id}:`, error);
    const apiError = handleApiError(error);
    throw apiError;
  }
}

// Products API
export interface GetProductsParams {
  categoryId?: number;
}

export async function getProducts(params?: GetProductsParams): Promise<Product[]> {
  try {
    const { data } = await api.get<Product[]>('/products', {
      params: params?.categoryId ? { categoryId: params.categoryId } : undefined,
    });
    return data;
  } catch (error) {
    console.error('Error fetching products:', error);
    const apiError = handleApiError(error);
    throw apiError;
  }
}

export async function getProductById(id: number): Promise<Product> {
  try {
    const { data } = await api.get<Product>(`/products/${id}`);
    return data;
  } catch (error) {
    console.error(`Error fetching product ${id}:`, error);
    const apiError = handleApiError(error);
    throw apiError;
  }
}

// Image URL builder
export function buildImageUrl(relPath?: string | null): string {
  if (!relPath) return '';
  // If the path already includes the base URL, return as is
  if (relPath.startsWith('http://') || relPath.startsWith('https://')) {
    return relPath;
  }
  // Build URL from relative path
  return `${baseUrl}/${relPath}`;
}

// Filter active products (client-side filtering as per API docs)
export function filterActiveProducts(products: Product[]): Product[] {
  return products.filter(product => product.status === 'active');
}
