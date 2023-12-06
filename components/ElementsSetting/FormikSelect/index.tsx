import { OptionList } from "@/utils/types";
import { useField } from "formik";
import React from "react";

type TPros = {
  label: string;
  id: string;
  name: string;
  isEdit: boolean;
  title: string;
  options: OptionList[];
};

function FormikSelect({
  label,
  title,
  isEdit,
  options,
  ...props
}: TPros): JSX.Element {
  const [field, meta] = useField(props);

  const renderSelectOption = () => {
    const options_list = [];
    for (let option of options) {
      options_list.push(
        <option value={option.id} key={option.id}>
          {option.value}
        </option>
      );
    }
    return options_list;
  };

  const capitalizeFirstLetter = (inputString: string): string => {
    if (inputString.length === 0) return inputString;
    const firstChar = inputString.charAt(0).toUpperCase();
    const restOfString = inputString.slice(1);
    return firstChar + restOfString;
  };
  const lowercaseFirstLetter = (inputString: string): string => {
    if (inputString.length === 0) return inputString;
    const firstChar = inputString.charAt(0).toLocaleLowerCase();
    const restOfString = inputString.slice(1);
    return firstChar + restOfString;
  };

  return (
    <div className="w-full relative  flex flex-col justify-between">
      <span className="text-sm font-medium mb-[6px]">
        {capitalizeFirstLetter(title)}
      </span>
      <select
        {...field}
        {...props}
        className={`w-full text-sm font-medium border-[1px]  text-gray-700 border-gray-300  bg-gray-50 py-[11px] ${
          isEdit ? "text-black" : ""
        } rounded-[6px]`}
        disabled={!isEdit}
      >
        <option value="">Select a {lowercaseFirstLetter(title)}...</option>
        {renderSelectOption()}
      </select>
      {meta.error && meta.touched && (
        <p className="text-[12px] font-medium text-[#fc8181]">{meta.error}</p>
      )}
    </div>
  );
}

export default FormikSelect;
