"use client";
import React from "react";
import axios from "axios";
import { Form, Formik } from "formik";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { ValidationError } from "yup";
import Image from "next/image";
import Logo from "@icons/logo/logo.svg";
import InputForm from "@/components/InputForm";
import { forgotSchema } from "@/app/validation";
import { forgotPassword } from "@/apis/auth";
type UserForgot = {
  email: string;
};
function ForgotPassword() {
  const router = useRouter();
  const onSubmit = async (values: UserForgot, actions: any) => {
    try {
      await forgotPassword(values);
      toast.success("Check your email to reset password!");
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
          toast.error("Invalid Email !");
        }
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
          <div className="p-16 max-w-[640px] shadow-lg w-full bg-white rounded-lg overflow-hidden ">
            <h2 className="text-3xl  leading-9 font-bold mb-3">
              Forgot your password?
            </h2>
            <p className="leading-6 text-base font-normal text-[#6B7280] mb-8">
              Don&apos;t fret! Just type in your email and we will send you a
              code to reset your password!
            </p>
            <Formik
              initialValues={{ email: "" }}
              validationSchema={forgotSchema}
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
                  <button
                    disabled={isSubmitting}
                    type="submit"
                    className="mb-6 bg-[#0065A9] disabled:opacity-50 hover:bg-[#005294] px-5 py-3 leading-6 font-medium rounded-lg text-white text-base"
                  >
                    Reset password
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ForgotPassword;
