"use client";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { login } from "@/redux/slices/user";
import { loginAccount } from "../../../apis/auth";
import { Form, Formik } from "formik";
import { loginSchema } from "@/app/validation";
import InputForm from "@/components/InputForm";
import Logo from "@icons/logo/logo.svg";
import LoginImg from "@image/page/authentication/signin/loginImage.jpg";
import { toast } from "react-toastify";
import axios from "axios";
import { ValidationError } from "yup";
import jwt_decode from "jwt-decode";
type UserLogin = {
  email: string;
  password: string;
  remember: boolean;
};

type EncodeType = {
  email: string;
  sub: string;
  UserRole: string;
  isUpdated: boolean;
  moderateStatus: boolean;
  "remember-me": boolean;
};

function SignIn() {
  const dispatch = useDispatch();
  const [remember, setRemember] = useState(false);
  const onHandleChoiceRemember = (status: boolean) => {
    setRemember(status);
  };
  const router = useRouter();
  const onSubmit = async (values: UserLogin, actions: any): Promise<void> => {
    try {
      values.remember = remember;
      const loginResponse = await loginAccount(values);
      const token: string = loginResponse.data.token;
      const decoded: EncodeType = jwt_decode(token);
      const user = {
        email: decoded.email,
        sub: decoded.sub,
        UserRole: decoded.UserRole,
        isUpdated: decoded.isUpdated,
        moderateStatus: decoded.moderateStatus,
        remember: decoded["remember-me"],
      };
      dispatch(
        login({
          token,
          user,
        })
      );

      toast.success(`Login success as ${user.email}`);
      setTimeout(() => {
        router.push("/");
      }, 500);
    } catch (error: unknown) {
      if (error instanceof ValidationError) {
        if (error?.name === "ValidationError") {
          toast.error(error.errors[0]);
        }
      }
      if (axios.isAxiosError(error)) {
        if (
          error.response?.status === 401 ||
          error.response?.status === 404 ||
          error.response?.status === 400
        ) {
          toast.error("Wrong password or email");
        }
        if (error.response?.status === 422)
          toast.error("Account is not verifed");
      }
      actions.resetForm();
    }
  };

  return (
    <section>
      <div className="h-screen w-full flex justify-center bg-[#F9FAFB] bg-opacity-50 items-center">
        <div className="flex flex-col max-w-[1440px] mt-6  justify-center items-center w-full ">
          <a href="#">
            <Image
              src={Logo}
              alt="Picture of the author"
              className="w-[210px] h-auto mb-10"
            />
          </a>
          <div className="max-w-[1024px] h-[581px] shadow-lg bg-white w-full flex items-center rounded-lg overflow-hidden ">
            <div className="">
              <Image
                src={LoginImg}
                alt="Picture of login"
                className="w-full h-[581px] "
              />
            </div>
            <div className=" px-16 w-[calc(100%-387px)]  ">
              <h2 className="text-3xl  leading-9 font-bold mb-8">
                Sign in to FU-BLOG
              </h2>
              <Formik
                initialValues={{ email: "", password: "", remember }}
                validationSchema={loginSchema}
                onSubmit={onSubmit}
              >
                {({ isSubmitting }) => (
                  <Form>
                    <div className="mb-6">
                      <div className="text-sm font-medium block leading-5 mb-2">
                        Your email:
                      </div>
                      <InputForm
                        label="email"
                        name="email"
                        type="email"
                        id="email"
                        placeholder="name@company.com"
                      ></InputForm>
                    </div>
                    <div className="mb-6">
                      <div className="text-sm font-medium block leading-5 mb-2">
                        Your password:
                      </div>
                      <InputForm
                        label="password"
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Enter your password"
                      ></InputForm>
                    </div>
                    <div className="mb-6 flex w-full justify-between items-center">
                      <div className="flex items-center  gap-3">
                        <input
                          onClick={() => onHandleChoiceRemember(!remember)}
                          id="remember"
                          type="checkbox"
                          className="h-4 w-4 rounded bg-[#F9FAFB] border-[#D1D5DB] outline-[#0065A9] peer-checked:bg-[#0065A9]  "
                        ></input>
                        <p className=" text-sm leading-5 font-medium">
                          Remember me
                        </p>
                      </div>
                      <Link
                        href="/auth/forgot-password"
                        className="text-[#0098FF] text-sm leading-5 font-medium hover:underline"
                      >
                        {" "}
                        Lost Password?
                      </Link>
                    </div>
                    <button
                      disabled={isSubmitting}
                      type="submit"
                      className="mb-6 bg-[#0065A9] disabled:opacity-50 hover:bg-[#005294] px-5 py-3 leading-6 font-medium rounded-lg text-white text-base"
                    >
                      Login to your account
                    </button>
                    <div className=" text-sm leading-5 font-medium text-[#6B7280]">
                      Not registered?
                      <Link
                        href="/auth/sign-up"
                        className="text-[#0098FF] ml-1  hover:underline"
                      >
                        {" "}
                        Create account
                      </Link>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SignIn;
