import axiosClient from "@/utils/axiosClient/index";
export const END_POINT = {
  LOGIN: "/auth/login",
  REGISTER: "/auth/register",
  FORGOT: "auth/forgot-password",
  RESET: "/auth/reset-password",
  CHANGE: "/auth/change-password",
};

type UserForgot = {
  email: string;
};

type UserLogin = {
  email: string;
  password: string;
  remember: boolean;
};

type UserReset = {
  user_id: string;
  newPassword: string;
};
type Token = {
  AccessToken: string;
};

type LoginResponse = {
  token: string;
  responseStatus: boolean;
  authErrors: [];
  returnTime: string;
};

type UserRegister = {
  email: string;
  password: string;
};

type UserChange = {
  user_id: string;
  oldPassword: string;
  newPassword: string;
};

export const loginAccount = (payload: UserLogin) => {
  return axiosClient.post<LoginResponse>(END_POINT.LOGIN, {
    email: payload.email,
    password: payload.password,
    RememberMe: payload.remember,
  });
};
export const registerAccount = (payload: UserRegister) => {
  return axiosClient.post(END_POINT.REGISTER, {
    email: payload.email,
    password: payload.password,
  });
};

export const forgotPassword = (payload: UserForgot) => {
  return axiosClient.post(END_POINT.FORGOT, {
    email: payload.email,
  });
};

export const resetAccount = (payload: UserReset) => {
  return axiosClient.patch(END_POINT.RESET, {
    user_id: payload.user_id,
    newPassword: payload.newPassword,
  });
};

export const changePassword = (payload: UserChange) => {
  return axiosClient.patch(END_POINT.CHANGE, {
    user_id: payload.user_id,
    oldPassword: payload.oldPassword,
    newPassword: payload.newPassword,
  });
};
