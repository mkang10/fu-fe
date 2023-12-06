import axiosClient from "@/utils/axiosClient/index";

export const END_POINT = {
  GET_ALL: "/blogs/tags",
  GET_BY_CATEGORY: "/blogs/tags/category/",
};

export const getAllTag = (access_token: string | null) => {
  return axiosClient.get(END_POINT.GET_ALL, {
    headers: { Authorization: `Bearer ${access_token}` },
  });
};

export const getTagsByCategory = (
  category_id: string,
  access_token: string | null
) => {
  return axiosClient.get(`${END_POINT.GET_BY_CATEGORY}${category_id}`, {
    headers: { Authorization: `Bearer ${access_token}` },
  });
};
