export type CreateProductRequestType = {
  name: string;
  price: string;
  category: string;
  description: string;
  avatar: string;
  developerEmail: string;
};

export type ProductType = {
  _id: string;
  name: string;
  price: number;
  category: string;
  description: string;
  avatar: string;
  developerEmail: string;
  createdAt: string;
  updatedAt: string;
};

export type ProductResponseType = {
  message: string;
  product: ProductType;
};

export type ProductListResponseType = {
  message: string;
  products: ProductType[];
};
