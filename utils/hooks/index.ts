import { Category } from "../types";

export const getUserInfoWithCategoryId = (
  department: string,
  categories: Category[]
) => {
  for (const category of categories) {
    if (category.title === department) {
      return category.category_id;
    }
  }
  return null;
};
