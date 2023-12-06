"use client";
import React from "react";
import { useRouter, useParams } from "next/navigation";
import { Form, Formik } from "formik";
import Image from "next/image";
import Logo from "@icons/logo/logo.svg";
import ResetImg from "@image/page/authentication/reset/resetImage.jpg";
import InputForm from "@/components/InputForm";
import { resetAccount } from "@/apis/auth";
import { resetSchema } from "@/app/validation";
import { ValidationError } from "yup";
import { toast } from "react-toastify";
import axios from "axios";
type UserReset = {
  newPassword: string;
  confirmNewPassword: string;
};
function ResetPassword() {
  const router = useRouter();
  const params = useParams();
  const onSubmit = async (values: UserReset, actions: any) => {
    try {
      const user_id = params.user_id as string;
      const response = await resetAccount({
        user_id: user_id,
        newPassword: values.newPassword,
      });
      if (response.status === 200) {
        toast.success(response.data.message);
        setTimeout(() => {
          router.push("/");
        }, 500);
      }
    } catch (error) {
      if (error instanceof ValidationError) {
        if (error?.name === "ValidationError") {
          toast.error(error.errors[0]);
        }
      }
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 400) {
          toast.error("Old password is not correct!");
        } else if (error.response?.status === 404) {
          toast.error("User not found!");
        }
        if (error.response?.status === 500)
          toast.error("An error occurred while updating the password!");
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
                src={ResetImg}
                alt="Picture of login"
                className="w-full h-[581px] "
              />
            </div>
            <div className=" px-16 w-[calc(100%-387px)]  ">
              <h2 className="text-3xl  leading-9 font-bold mb-8">
                Reset your password
              </h2>
              <Formik
                initialValues={{
                  newPassword: "",
                  confirmNewPassword: "",
                }}
                validationSchema={resetSchema}
                onSubmit={onSubmit}
              >
                {({ isSubmitting }) => (
                  <Form>
                    <div className="mb-6">
                      <div className="text-sm font-medium block leading-5 mb-2">
                        Your new password:
                      </div>
                      <InputForm
                        label="newPassword"
                        type="password"
                        name="newPassword"
                        id="newPassword"
                        placeholder="Enter your new password"
                      ></InputForm>
                    </div>
                    <div className="mb-6">
                      <div className="text-sm font-medium block leading-5 mb-2">
                        Confirm your new password:
                      </div>
                      <InputForm
                        label="confirmNewPassword"
                        type="password"
                        name="confirmNewPassword"
                        id="confirmNewPassword"
                        placeholder="Confirm your new password"
                      ></InputForm>
                    </div>
                    <button
                      disabled={isSubmitting}
                      type="submit"
                      className="mb-6 bg-[#0065A9] disabled:opacity-50 hover:bg-[#005294] px-5 py-3 leading-6 font-medium rounded-lg text-white text-base"
                    >
                      Reset password
                    </button>
                    <div className=" text-sm leading-5 font-medium text-[#6B7280]">
                      Already have an account?
                      <a
                        href="/auth/sign-in"
                        className="text-[#0098FF] ml-1  hover:underline"
                      >
                        Login here
                      </a>
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

export default ResetPassword;
