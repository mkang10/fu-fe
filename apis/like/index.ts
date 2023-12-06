import axiosClient from "@/utils/axiosClient/index";
export const END_POINT = {
  LIKE_POST: "/likes/like-post",
  UNLIKE_POST: "/likes/unlike-post",
  COUNT_LIKE_BLOG: "/likes/blog-like-count/",
  COUNT_LIKE_COMMENT: "/likes/comment-like-count/",
  COUNT_LIKE_COMMENT_REPLY: "/likes/comment-reply-like-count/",
  CHECK_LIKE_BLOG: "/likes/check-liked-post/",
  CHECK_LIKE_COMMENT: "/likes/check-liked-comment/",
  CHECK_LIKE_COMMENT_REPLY: "/likes/check-liked-comment-reply/",
  CHECK_SAVE_POST: "/likes/check-saved-post/",
};

type LikePost = {
  user_id: string;
  blog_id: string;
};

type UnLikePost = {
  user_id: string;
  blog_id: string;
};

export const likePost = (payload: LikePost) => {
  return axiosClient.post(END_POINT.LIKE_POST, {
    user_id: payload.user_id,
    blog_id: payload.blog_id,
  });
};

export const unlikePost = (payload: UnLikePost) => {
  return axiosClient.delete(END_POINT.UNLIKE_POST, {
    data: {
      user_id: payload.user_id,
      blog_id: payload.blog_id,
    },
  });
};

export const getLike = (access_token: string | null, blog_id: string) => {
  return axiosClient.get(`${END_POINT.COUNT_LIKE_BLOG}${blog_id}`, {
    headers: { Authorization: `Bearer ${access_token}` },
  });
};

export const getCommentLike = (
  access_token: string | null,
  comment_id: string
) => {
  return axiosClient.get(`${END_POINT.COUNT_LIKE_COMMENT}${comment_id}`, {
    headers: { Authorization: `Bearer ${access_token}` },
  });
};

export const getCommentReplyLike = (
  access_token: string | null,
  comment_id: string
) => {
  return axiosClient.get(`${END_POINT.COUNT_LIKE_COMMENT_REPLY}${comment_id}`, {
    headers: { Authorization: `Bearer ${access_token}` },
  });
};

export const checkLikedPost = (
  access_token: string | null,
  user_id: string,
  blog_id: string
) => {
  return axiosClient.get(`${END_POINT.CHECK_LIKE_BLOG}${user_id}/${blog_id}`, {
    headers: { Authorization: `Bearer ${access_token}` },
  });
};

export const checkedLikedComment = (
  access_token: string | null,
  user_id: string,
  comment_id: string
) => {
  return axiosClient.get(
    `${END_POINT.CHECK_LIKE_COMMENT}${user_id}${comment_id}`,
    {
      headers: { Authorization: `Bearer ${access_token}` },
    }
  );
};

export const checkedLikedCommentReply = (
  access_token: string | null,
  user_id: string,
  comment_id: string
) => {
  return axiosClient.get(
    `${END_POINT.CHECK_LIKE_COMMENT_REPLY}${user_id}${comment_id}`,
    {
      headers: { Authorization: `Bearer ${access_token}` },
    }
  );
};

export const checkSavedPost = (
  access_token: string | null,
  user_id: string,
  blog_id: string
) => {
  return axiosClient.get(`${END_POINT.CHECK_SAVE_POST}${user_id}/${blog_id}`, {
    headers: { Authorization: `Bearer ${access_token}` },
  });
};
