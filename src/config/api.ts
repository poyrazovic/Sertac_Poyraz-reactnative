import { REACT_APP_API_URL, REACT_APP_TOKEN } from '@env';
import { CategoryListResponseType, CategoryResponseType } from '../models/category.model';
import { ProductResponseType, ProductListResponseType, CreateProductRequestType } from '../models/product.model';

const options = {
  headers: { Authorization: `Bearer ${REACT_APP_TOKEN}` },
};

export const getProducts = async (): Promise<ProductListResponseType> => {
  const response = await fetch(`${REACT_APP_API_URL}/products`, options);
  return response.json();
};

export const getProduct = async (id: string): Promise<ProductResponseType> => {
  const response = await fetch(`${REACT_APP_API_URL}/products/${id}`, options);
  return response.json();
};

export const createProduct = async (payload: CreateProductRequestType): Promise<ProductResponseType> => {
  const response = await fetch(`${REACT_APP_API_URL}/products`, {
    headers: { ...options.headers, 'Content-Type': 'application/json' },
    method: 'POST',
    body: JSON.stringify(payload),
  });
  return response.json();
};

export const getCategories = async (): Promise<CategoryListResponseType> => {
  const response = await fetch(`${REACT_APP_API_URL}/categories`, options);
  return response.json();
};

export const getCategory = async (id: string): Promise<CategoryResponseType> => {
  const response = await fetch(`${REACT_APP_API_URL}/products/${id}`, options);
  return response.json();
};
