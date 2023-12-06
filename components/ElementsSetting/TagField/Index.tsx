import React, { useEffect, useState } from "react";
import Tags from "@yaireo/tagify/dist/react.tagify";
import UnlinkButton from "@/components/ModifyButton";
import { TagifySettings } from "@yaireo/tagify";
import "./styling.scss";

interface TagFieldProps {
  suggestions: string[];
  setState: React.Dispatch<React.SetStateAction<string[]>>;
  state: string[];
  isEdit: boolean;
  useTagFor: "skills" | "hobbies";
}

const baseTagifySettings = {
  blacklist: [],
  maxTags: 30,
  backspace: "edit",
  placeholder: "Enter tags...",
  editTags: 1,
  dropdown: {
    enabled: 0,
  },
  callbacks: {} as any,
};

function TagField({
  suggestions = [],
  setState,
  state,
  isEdit,
  useTagFor,
}: TagFieldProps) {
  const [data, setData] = useState<string[]>(state);

  const handleChange = (e: CustomEvent) => {
    setData(e.detail.tagify.value.map((item: { value: string }) => item.value));
  };

  const settings: TagifySettings<Tagify.BaseTagData> = {
    ...baseTagifySettings,
    whitelist: suggestions,
    editTags: 1,
    backspace: "edit",
    callbacks: {
      add: handleChange,
      remove: handleChange,
      blur: handleChange,
      invalid: handleChange,
      click: handleChange,
      focus: handleChange,
      "edit:updated": handleChange,
      "edit:start": handleChange,
      "edit:input": handleChange,
    },
  };

  const handleSubmitTags = () => {
    if (useTagFor === "skills") {
      console.log("POST SKILL TAGS", data);
    }
    if (useTagFor === "hobbies") {
      console.log("POST HOBBIES TAGS", data);
    }
  };

  return (
    <div className="flex flex-col gap-[20px]">
      <div
        className={`form-group border-[1px] border-gray-300  rounded-[6px] p-[6px] 
        ${useTagFor === "skills" ? "isSkills" : "isHobbies"}
      ${isEdit ? "" : "pointer-events-none"}`}
      >
        <Tags value={state} settings={settings} readOnly={false} />
      </div>
      {isEdit ? (
        <div>
          <UnlinkButton
            textContent={"Save"}
            icon={""}
            iconPosition={"left"}
            backgroundColor={"bg-blue-700"}
            method={() => {
              handleSubmitTags();
            }}
            tailwind={"text-white"}
          ></UnlinkButton>
        </div>
      ) : null}
    </div>
  );
}

export default TagField;
