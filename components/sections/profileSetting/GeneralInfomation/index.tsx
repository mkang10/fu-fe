import React, { useEffect, useRef, useState } from "react";
import { Form, Formik, FormikHelpers } from "formik";
import { toast } from "react-toastify";
import { generalInformationSchema } from "@component/ElementsSetting/Validation/validation";
import FormikSelect from "@component/ElementsSetting/FormikSelect";
import FormikInput from "@component/ElementsSetting/FormikInput";
import Image from "next/image";

import EditIconAnimate from "@icons/components/Button/edit.gif";
import EditIconPause from "@icons/components/Button/edit_pause.png";
import { Department, Major, OptionList, UserSetting } from "@/utils/types";
import axios from "axios";
import { getCookie } from "cookies-next";
import { formatDateToYYYYMMDD } from "@/utils/dayFormat";
import { getAllDepartments } from "@/apis/department";
import { getAllMajors } from "@/apis/major";
import { updateMemberGeneral } from "@/apis/profile";
type TGeneralFieldValues = {
  firstName: string;
  lastName: string;
  position: string;
  major: string;
  department: string;
  joinDate: string;
};

type TOptionsList = {
  id: string;
  value: string;
};

type TProps = {
  userData: UserSetting;
};

function GeneralInformation({ userData }: TProps) {
  const [departmentOptions, setDeparmentOptions] = useState<OptionList[]>([]);
  const [majorOptions, setAllMajorOptions] = useState<OptionList[]>([]);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const formikRef = useRef<FormikHelpers<TGeneralFieldValues> | null>(null);
  const onSubmit = async (
    values: TGeneralFieldValues,
    actions: FormikHelpers<TGeneralFieldValues>
  ) => {
    const filtedValue = {
      firstName: values.firstName,
      lastName: values.lastName,
      position: values.position,
      major: values.major,
      department: values.department,
    };
    const user_id = getCookie("user_id");
    try {
      const access_token = getCookie("accessToken");
      if (access_token && user_id) {
        await updateMemberGeneral(filtedValue, user_id);
        toast.success(`Update general information successfully!`);
        actions.resetForm();
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(`Update general information failed!`);
      }
    }
  };

  const handleEditClick = () => {
    if (formikRef.current) {
      formikRef.current.resetForm();
    }
    setIsEdit(!isEdit);
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
    <div className="flex flex-col gap-[20px] p-[24px] shadow-primary rounded-[10px]">
      <div className="flex flex-row justify-between">
        <h3 className="font-[700] text-[24px]">General infomation</h3>
        <button
          className="w-[28px] h-[28px] flex items-center justify-center hover:scale-125 rounded-[50%] hover:border-[1px] hover:border-blue-700 cursor-pointer transition"
          onClick={handleEditClick}
        >
          <Image
            src={isEdit ? EditIconAnimate : EditIconPause}
            alt="Edit"
            width={18}
            height={18}
          />
        </button>
      </div>
      <div>
        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            major: "",
            position: "",
            department: "",
            joinDate: formatDateToYYYYMMDD(userData.created_at),
          }}
          validationSchema={generalInformationSchema}
          onSubmit={onSubmit}
        >
          {(formikProps) => {
            formikRef.current = formikProps;
            return (
              <Form className="flex flex-col gap-[20px]">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-[20px] select-none">
                  <FormikInput
                    label={"firstName"}
                    id={"firstName"}
                    name={"firstName"}
                    placeholder={
                      userData.first_name
                        ? userData.first_name
                        : "Enter your fisrt name..."
                    }
                    type={"text"}
                    isEdit={isEdit}
                    title={"first name"}
                  />
                  <FormikInput
                    label={"lastName"}
                    id={"lastName"}
                    name={"lastName"}
                    placeholder={
                      userData.last_name
                        ? userData.last_name
                        : "Enter your last name..."
                    }
                    type={"text"}
                    isEdit={isEdit}
                    title={"Last name"}
                  />
                  <FormikInput
                    label={"position"}
                    id={"position"}
                    name={"position"}
                    placeholder={
                      userData.position
                        ? userData.position
                        : "Enter your position..."
                    }
                    type={"text"}
                    isEdit={isEdit}
                    title={"position"}
                  />
                  <FormikSelect
                    label={"department"}
                    id={"department"}
                    name={"department"}
                    isEdit={isEdit}
                    title={"department"}
                    options={departmentOptions!}
                  />
                  <FormikSelect
                    label={"major"}
                    id={"major"}
                    name={"major"}
                    isEdit={isEdit}
                    title={"major"}
                    options={majorOptions!}
                  />
                  <FormikInput
                    label={"joinDate"}
                    id={"joinDate"}
                    name={"joinDate"}
                    placeholder={"Enter your join date..."}
                    type={"date"}
                    isEdit={false}
                    title={"join date"}
                  />
                </div>
                {isEdit ? (
                  <div>
                    <button
                      type="submit"
                      className="rounded-[8px] px-[12px] py-[8px] text-[12px] bg-blue-700 text-white"
                    >
                      Save
                    </button>
                  </div>
                ) : null}
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
}

export default GeneralInformation;
