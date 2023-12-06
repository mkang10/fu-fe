import axiosClient from "@/utils/axiosClient/index";
export const END_POINT = {
  ADD_COMMENT: "/comments/add",
  GET_ALL: "/comments/all/",
  ADD_REPLY: "/comments/add-reply",
  GET_REPLY: "/comments/reply/",
};

type addComment = {
  user_id: string;
  blog_id: string;
  content: string;
};

type addReplyComment = {
  user_id: string;
  comment_id: string;
  content: string;
};

export const addComment = (payload: addComment) => {
  return axiosClient.post(END_POINT.ADD_COMMENT, {
    user_id: payload.user_id,
    blog_id: payload.blog_id,
    content: payload.content,
  });
};

export const getAllComments = (
  blog_id: string,
  access_token: string | null
) => {
  return axiosClient.get(`${END_POINT.GET_ALL}${blog_id}`, {
    headers: { Authorization: `Bearer ${access_token}` },
  });
};

export const addReplyComment = (payload: addReplyComment) => {
  return axiosClient.post(END_POINT.ADD_REPLY, {
    user_id: payload.user_id,
    comment_id: payload.comment_id,
    content: payload.content,
  });
};

export const getAllReply = (
  comment_id: string,
  access_token: string | null
) => {
  return axiosClient.get(`${END_POINT.GET_REPLY}${comment_id}`, {
    headers: { Authorization: `Bearer ${access_token}` },
  });
};
