import React, { useState, useRef } from "react";
import { Form, Formik, FormikHelpers } from "formik";
import { toast } from "react-toastify";
import { changePasswordSchema } from "@component/ElementsSetting/Validation/validation";
import FormikInput from "@component/ElementsSetting/FormikInput";
import Image from "next/image";

import EditIconAnimate from "@icons/components/Button/edit.gif";
import EditIconPause from "@icons/components/Button/edit_pause.png";
import { getCookie } from "cookies-next";
import { changePassword } from "@/apis/auth";
import axios from "axios";
import { ValidationError } from "yup";
type ChangePassword = {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
};

interface CProps {
  user_id: string;
}

function ChangePassword({ user_id }: CProps): JSX.Element {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const formikRef = useRef<FormikHelpers<ChangePassword> | null>(null);

  const onSubmit = async (
    values: ChangePassword,
    actions: FormikHelpers<ChangePassword>
  ) => {
    const accessToken = getCookie("accessToken");
    try {
      if (accessToken) {
        const payload = {
          user_id: user_id,
          oldPassword: values.currentPassword,
          newPassword: values.confirmNewPassword,
        };
        const response = await changePassword(payload);
        toast.success(response.data.message);
      }
    } catch (error) {
      if (error instanceof ValidationError) {
        if (error?.name === "ValidationError") {
          toast.error(error.errors[0]);
        }
      }
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 500) {
          toast.error("An error occurred while updating the password.");
        }
        if (
          error.response?.status === 401 ||
          error.response?.status === 404 ||
          error.response?.status === 400
        ) {
          toast.error("Old password does not match");
        }
      }
      actions.resetForm();
    }
  };

  const handleEditClick = () => {
    if (formikRef.current) {
      formikRef.current.resetForm();
    }
    setIsEdit(!isEdit);
  };

  return (
    <div className="flex flex-col gap-[20px] p-[24px] shadow-primary rounded-[10px]">
      <div className="flex flex-row justify-between">
        <h3 className="font-[700] text-[24px]">Change password</h3>
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
            currentPassword: "",
            newPassword: "",
            confirmNewPassword: "",
          }}
          validationSchema={changePasswordSchema}
          onSubmit={onSubmit}
        >
          {(formikProps) => {
            // Store the Formik instance in the ref
            formikRef.current = formikProps;
            return (
              <Form>
                <div className="flex flex-col gap-[20px]">
                  <FormikInput
                    label="currentPassword"
                    id="currentPassword"
                    name="currentPassword"
                    placeholder="Enter your current password..."
                    type="password"
                    isEdit={isEdit}
                    title="Current password"
                  />
                  <FormikInput
                    label="newPassword"
                    id="newPassword"
                    name="newPassword"
                    placeholder="Enter your new password..."
                    type="password"
                    isEdit={isEdit}
                    title="New password"
                  />
                  <FormikInput
                    label="confirmNewPassword"
                    id="confirmNewPassword"
                    name="confirmNewPassword"
                    placeholder="Confirm your new password..."
                    type="password"
                    isEdit={isEdit}
                    title="Confirm new password"
                  />

                  <div className="text-[14px]">
                    <h3 className="font-[800]">Password requirements:</h3>
                    <h4 className="font-[700]">
                      Ensure that these requirements are met:
                    </h4>
                    <ul className="font-[300] list-disc ml-[24px]">
                      <li>At least 8 characters (and up to 100 characters)</li>
                      <li>At least one lowercase character</li>
                      <li>
                        Inclusion of at least one special character, e.g., ! @ #
                        ?
                      </li>
                    </ul>
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
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
}

export default ChangePassword;
