import { useField } from "formik";
import React, { useState } from "react";

import { FaEye, FaEyeSlash } from "react-icons/fa";

type TPros = {
  label: string;
  id: string;
  name: string;
  placeholder: string;
  type: string;
  isEdit: boolean;
  title: string;
};

function FormikInput({
  label,
  title,
  isEdit,
  type,
  ...props
}: TPros): JSX.Element {
  const [field, meta] = useField(props);
  const [isEyeOpen, setIsEyeOpen] = useState<boolean>(false);

  const capitalizeFirstLetter = (inputString: string): string => {
    if (inputString.length === 0) return inputString;
    const firstChar = inputString.charAt(0).toUpperCase();
    const restOfString = inputString.slice(1);
    return firstChar + restOfString;
  };

  return (
    <div className="flex flex-col relative">
      <span className="font-[300] text-[14px] mb-[6px]">
        {capitalizeFirstLetter(title)}
      </span>
      <input
        {...field}
        {...props}
        type={isEyeOpen ? "text" : type}
        disabled={!isEdit}
        className={
          meta.error && meta.touched
            ? "p-[10px] text-sm font-medium leading-5 w-full border-solid border-[1px] border-red-500  outline-[#0065A9] rounded-[6px] bg-gray-50"
            : "p-[10px] text-sm font-medium leading-5 w-full border-solid border-[1px] border-gray-300  outline-[#0065A9] rounded-[6px] bg-gray-50"
        }
        style={{
          color: !isEdit ? "rgb(107 114 128)" : "#000",
        }}
      />
      {type === "password" ? (
        <>
          <div
            onClick={() => {
              if (isEdit) setIsEyeOpen(true);
            }}
          >
            <FaEye
              className={`absolute right-[20px] top-[40px] text-gray-500 ${
                isEyeOpen && isEdit ? "hidden" : ""
              } ${isEdit ? "cursor-pointer" : ""}`}
            />
          </div>
          <div
            onClick={() => {
              if (isEdit) setIsEyeOpen(false);
            }}
          >
            <FaEyeSlash
              className={`absolute right-[20px] top-[40px] text-gray-500 ${
                isEyeOpen && isEdit ? "" : "hidden"
              } ${isEdit ? "cursor-pointer" : ""}`}
            />
          </div>
        </>
      ) : null}
      {meta.error && meta.touched && (
        <p className="text-[12px] font-medium text-[#fc8181]">{meta.error}</p>
      )}
    </div>
  );
}

export default FormikInput;
