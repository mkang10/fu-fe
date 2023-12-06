import axiosClient from "@/utils/axiosClient/index";

export const END_POINT = {
  GET: "/users/departments",
};

export const getAllDepartments = (access_token: string | null) => {
  return axiosClient.get(END_POINT.GET, {
    headers: { Authorization: `Bearer ${access_token}` },
  });
};
