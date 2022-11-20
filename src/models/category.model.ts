export type CategoryType = {
  _id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
};

export type CategoryResponseType = {
  message: string;
  category: CategoryType;
};

export type CategoryListResponseType = {
  message: string;
  categories: CategoryType[];
};
