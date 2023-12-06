import axiosClient from "@/utils/axiosClient/index";

export const END_POINT = {
  GET: "/notification/all-client",
  READ: "/notification/detail/",
};

export const getAllNotification = (access_token: string | null) => {
  return axiosClient.get(END_POINT.GET, {
    headers: { Authorization: `Bearer ${access_token}` },
  });
};

export const getNotificationDetail = (
  notificaion_id: string,
  access_token: string | null
) => {
  return axiosClient.get(`${END_POINT.READ}${notificaion_id}`, {
    headers: { Authorization: `Bearer ${access_token}` },
  });
};
