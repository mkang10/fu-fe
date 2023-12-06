import axiosClient from "@/utils/axiosClient/index";

export const END_POINT = {
  CREATE: "/blogs/create",
  CREATE_REJECT: "/blogs/create-reject",
  CREATE_BLOG_TAGS: "/blogs/create/blog-tags",
  GET_POSTED: "/blogs/posted/",
  GET_PENDING: "/blogs/pending",
  GET_SAVED: "/blogs/saved/",
  GET_BY_ID: "/blogs/",
  GET_BLOG_TAGS: "/blogs/blog-tags/",
  APPROVE: "/blogs/approve/",
  REJECT: "/blogs/reject/",
  SEARCH: "/blogs/search",
  GET_FEATURED: "/blogs/featured",
  GET_MAJOR: "/blogs/major/",
  GET_LIST_CATEGORY: "/blogs/category-blog/",
  GET_LIST_TAG: "/blogs/tag-blog/",
  SAVE: "/blogs/save",
  DELETE_SAVE: "/blogs/un-save",
  DELTE_BLOG: "/blogs/hide/",
};

type createBlog = {
  user_id: string;
  blogTitle: string;
  category_id: string;
  htmlString: string;
  status: number;
  visual: string | undefined | null;
};
type createReject = {
  user_id: string;
  blog_id: string;
  reject_reason: string;
  
};

type blogTags = {
  blog_id: string;
  tags: string[];
};

type blogSearch = {
  search: string;
  category_id: string;
};

type blogSave = {
  blog_id: string;
  user_id: string;
};

type blogUnsave = {
  blog_id: string;
  user_id: string;
};

export const createBlog = async (payload: createBlog) => {
  try {
    const response = await axiosClient.post(END_POINT.CREATE, {
      user_id: payload.user_id,
      blogTitle: payload.blogTitle,
      category_id: payload.category_id,
      content: payload.htmlString,
      status: 0,
      visual: payload.visual,
    });
    return response.data;
  } catch (error: any) {
    return {
      success: false,
      message: "Failed to create a blog",
      error: error.message,
    };
  }
};

export const createReject = async (payload: createReject) => {
  try {
    const response = await axiosClient.post(END_POINT.CREATE_REJECT, {
      user_id: payload.user_id,
      blog_id: payload.blog_id,
      reject_reason: payload.reject_reason,
    });
    return response.data;
  } catch (error: any) {
    return {
      success: false,
      message: "Failed to create a reject",
      error: error.message,
    };
  }
};

export const createBlogTags = (payload: blogTags) => {
  return axiosClient.post(END_POINT.CREATE_BLOG_TAGS, {
    blog_id: payload.blog_id,
    tags: payload.tags,
  });
};

export const saveBlog = (payload: blogSave) => {
  return axiosClient.post(END_POINT.SAVE, {
    blog_id: payload.blog_id,
    user_id: payload.user_id,
  });
};

export const unsaveBlog = (payload: blogUnsave) => {
  const { blog_id, user_id } = payload;
  return axiosClient.delete(`${END_POINT.DELETE_SAVE}/${blog_id}/${user_id}`);
};

export const getPostedBlog = (
  user_id: string,
  access_token: string | null,
  page: number
) => {
  return axiosClient.get(`${END_POINT.GET_POSTED}${user_id}`, {
    headers: { Authorization: `Bearer ${access_token}` },
    params: { page },
  });
};

export const getSavedBlog = (
  user_id: string,
  access_token: string | null,
  page: number
) => {
  return axiosClient.get(`${END_POINT.GET_SAVED}${user_id}`, {
    headers: { Authorization: `Bearer ${access_token}` },
    params: { page },
  });
};

export const getFeaturedBlog = (access_token: string | null) => {
  return axiosClient.get(`${END_POINT.GET_FEATURED}`, {
    headers: { Authorization: `Bearer ${access_token}` },
  });
};

export const getMajorBlogs = (
  category_id: string,
  access_token: string | null
) => {
  return axiosClient.get(`${END_POINT.GET_MAJOR}${category_id}`, {
    headers: { Authorization: `Bearer ${access_token}` },
  });
};

export const getListMajorBlogs = (
  category_id: string,
  access_token: string | null,
  page: number
) => {
  return axiosClient.get(`${END_POINT.GET_LIST_CATEGORY}${category_id}`, {
    headers: { Authorization: `Bearer ${access_token}` },
    params: { page },
  });
};

export const getListTagBlogs = (
  tag_id: string,
  access_token: string | null,
  page: number
) => {
  return axiosClient.get(`${END_POINT.GET_LIST_TAG}${tag_id}`, {
    headers: { Authorization: `Bearer ${access_token}` },
    params: { page },
  });
};

export const getPendingBlog = (access_token: string | null, page: number) => {
  return axiosClient.get(`${END_POINT.GET_PENDING}`, {
    headers: { Authorization: `Bearer ${access_token}` },
    params: { page },
  });
};

export const getBlogByID = (blog_id: string, access_token: string | null) => {
  return axiosClient.get(`${END_POINT.GET_BY_ID}${blog_id}`, {
    headers: { Authorization: `Bearer ${access_token}` },
  });
};

export const getBlogTags = (blog_id: string, access_token: string | null) => {
  return axiosClient.get(`${END_POINT.GET_BLOG_TAGS}${blog_id}`, {
    headers: { Authorization: `Bearer ${access_token}` },
  });
};

export const approveBlog = (blog_id: string, access_token: string | null) => {
  return axiosClient.patch(`${END_POINT.APPROVE}${blog_id}`, {
    headers: { Authorization: `Bearer ${access_token}` },
  });
};

export const rejectBlog = (blog_id: string, access_token: string | null) => {
  return axiosClient.patch(`${END_POINT.REJECT}${blog_id}`, {
    headers: { Authorization: `Bearer ${access_token}` },
  });
};

export const deleteBlog = (blog_id: string, access_token: string | null) => {
  return axiosClient.patch(`${END_POINT.DELTE_BLOG}${blog_id}`, {
    headers: { Authorization: `Bearer ${access_token}` },
  });
};

export const searchBlog = (payload: blogSearch) => {
  return axiosClient.post(END_POINT.SEARCH, {
    search: payload.search,
    category_id: payload.category_id,
  });
};
