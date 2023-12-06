"use client";
import { Formik, Form } from "formik";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import InputForm from "@/components/InputForm";
import { updateInfoSchema } from "@/app/validation";
import { getCookie } from "cookies-next";
import { updateInfo } from "@/apis/profile";
import FormikSelect from "@/components/ElementsSetting/FormikSelect";
import { getAllDepartments } from "@/apis/department";
import { Department, Major, OptionList } from "@/utils/types";
import axios from "axios";
import { getAllMajors } from "@/apis/major";
type updateProfile = {
  first_name: string;
  last_name: string;
  department: string;
  major: string;
};

function GeneralInformation() {
  const [departmentOptions, setDeparmentOptions] = useState<OptionList[]>([]);
  const [majorOptions, setAllMajorOptions] = useState<OptionList[]>([]);
  const onSubmit = async (values: updateProfile, actions: any) => {
    const accessToken = getCookie("accessToken");
    const user_id = getCookie("user_id") as string;
    try {
      if (accessToken) {
        await updateInfo(values, user_id);
        toast.success("Save information successfully");
      }
    } catch (error) {
      console.log(error);
    }
    // toast.success("Save information successfully");
  };

  const handleGetAllDeparment = async () => {
    try {
      const access_token = getCookie("accessToken");
      if (access_token) {
        const res = await getAllDepartments(access_token);
        const data = res.data;
        const filtedData = data
          .map((item: Department) => {
            return {
              id: item.department_id,
              value: item.description,
            };
          })
          .filter((item: OptionList) => item.value !== "default");
        setDeparmentOptions(filtedData);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error);
      }
    }
  };

  const handleGetAllMajors = async () => {
    try {
      const access_token = getCookie("accessToken");
      if (access_token) {
        const res = await getAllMajors(access_token);
        const data = res.data;
        const filtedData = data
          .map((item: Major) => {
            return {
              id: item.major_id,
              value: item.description,
            };
          })
          .filter((item: OptionList) => item.value !== "default");
        setAllMajorOptions(filtedData);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    handleGetAllDeparment();
    handleGetAllMajors();
  }, []);

  return (
    <>
      <main className="w-full h-full flex flex-col items-center justify-center ">
        <div className="w-full gap-5 p-[20px] flex flex-col">
          <h1 className="text-2xl font-bold">General Information</h1>
          <Formik
            initialValues={{
              first_name: "",
              last_name: "",
              department: "",
              major: "",
            }}
            validationSchema={updateInfoSchema}
            onSubmit={onSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                <div className=" flex justify-between flex-wrap">
                  <div className=" flex mb-4 w-[calc(50%-20px)] flex-col">
                    <div className="text-sm font-medium block leading-5 mb-2">
                      First name:
                    </div>
                    <InputForm
                      label="first_name"
                      name="first_name"
                      type="text"
                      id="first_name"
                      placeholder="Jonh"
                    ></InputForm>
                  </div>
                  <div className=" flex mb-4 w-[calc(50%-20px)] flex-col">
                    <div className="text-sm font-medium block leading-5 mb-2">
                      Last name:
                    </div>
                    <InputForm
                      label="last_name"
                      name="last_name"
                      type="text"
                      id="last_name"
                      placeholder="Doe"
                    ></InputForm>
                  </div>
                  <div className=" flex mb-4 w-[calc(50%-20px)] flex-col">
                    <FormikSelect
                      label={"department"}
                      id={"department"}
                      name={"department"}
                      isEdit={true}
                      title={"department"}
                      options={departmentOptions!}
                    />
                  </div>
                  <div className=" flex mb-4 w-[calc(50%-20px)] flex-col">
                    <FormikSelect
                      label={"major"}
                      id={"major"}
                      name={"major"}
                      isEdit={true}
                      title={"major"}
                      options={majorOptions!}
                    />
                  </div>
                  <div className="w-full flex justify-end">
                    <button
                      disabled={isSubmitting}
                      type="submit"
                      className=" bg-[#0065A9] disabled:opacity-50 hover:bg-[#005294] px-6 py-2 font-medium rounded-lg text-white text-sm"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </main>
    </>
  );
}

export default GeneralInformation;
