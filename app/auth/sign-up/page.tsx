"use client";
import React from "react";
import { Form, Formik } from "formik";
import Image from "next/image";
import { registerSchema } from "@/app/validation";
import Logo from "@icons/logo/logo.svg";
import SignupImage from "@image/page/authentication/signup/signupImage.jpg";
import InputForm from "@/components/InputForm";
import Link from "next/link";
import { toast } from "react-toastify";
import { registerAccount } from "@/apis/auth";
import { useRouter } from "next/navigation";
import { ValidationError } from "yup";
import axios from "axios";
type UserRegister = {
  email: string;
  password: string;
};
function SignUp() {
  const router = useRouter();
  const onSubmit = async (values: UserRegister, actions: any) => {
    try {
      await registerAccount(values);
      toast.success("Register success ! Check your email to validated");
      setTimeout(() => {
        router.push("/auth/sign-in");
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
          toast.error("Cannot register !");
        }
        if (error.response?.status === 409)
          toast.error("User has been register !");
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
          <div className="max-w-[1024px] h-[613px] shadow-lg bg-white w-full flex items-center rounded-lg overflow-hidden ">
            <div className="">
              <Image
                src={SignupImage}
                alt="Picture of login"
                className="w-full h-[613px] "
              />
            </div>
            <div className=" p-16 w-[calc(100%-387px)]  ">
              <h2 className="text-3xl  leading-9 font-bold mb-8">
                Create a free account
              </h2>
              <Formik
                initialValues={{
                  email: "",
                  password: "",
                  confirmPassword: "",
                }}
                validationSchema={registerSchema}
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
                    <div className="mb-6">
                      <div className="text-sm font-medium block leading-5 mb-2">
                        Confirm your password:
                      </div>
                      <InputForm
                        label="confirmPassword"
                        type="password"
                        name="confirmPassword"
                        id="confirmPassword"
                        placeholder="Confirm your password"
                      ></InputForm>
                    </div>
                    <button
                      disabled={isSubmitting}
                      type="submit"
                      className="mb-6 bg-[#0065A9] disabled:opacity-50 hover:bg-[#005294] px-5 py-3 leading-6 font-medium rounded-lg text-white text-base"
                    >
                      Create an account
                    </button>
                    <div className=" text-sm leading-5 font-medium text-[#6B7280]">
                      Already have an account?
                      <Link
                        href="/auth/sign-in"
                        className="text-[#0098FF] ml-1  hover:underline"
                      >
                        {" "}
                        Login here
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

export default SignUp;
