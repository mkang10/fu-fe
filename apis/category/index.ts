import axiosClient from "@/utils/axiosClient/index";

export const END_POINT = {
  GET_ALL: "/blogs/categories",
  GET_BY_ID: "/blogs/categories/",
};

export const getAllCategory = (access_token: string | null) => {
  return axiosClient.get(END_POINT.GET_ALL, {
    headers: { Authorization: `Bearer ${access_token}` },
  });
};

export const getCategoryById = (
  category_id: string,
  access_token: string | null
) => {
  return axiosClient.get(`${END_POINT.GET_BY_ID}${category_id}`, {
    headers: { Authorization: `Bearer ${access_token}` },
  });
};
