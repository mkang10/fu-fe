import React, { useState } from "react";
import Tags from "@yaireo/tagify/dist/react.tagify";
import { TagifySettings } from "@yaireo/tagify";
import "@component/ElementsSetting/TagField/Styling.scss";
import { blogCategory } from "@/utils/types";

interface TagFieldProps {
  allowTagNumber: number;
  suggestions: string[];
  setState: React.Dispatch<React.SetStateAction<string>>;
  state: string;
  placeholder: string;
  categories: blogCategory[];
  setStateId: React.Dispatch<React.SetStateAction<string>>;
}

function BlogTagField({
  allowTagNumber,
  suggestions = [],
  setState,
  state,
  placeholder,
  categories,
  setStateId,
}: TagFieldProps) {
  const baseTagifySettings = {
    blacklist: [],
    maxTags: allowTagNumber,
    backspace: "edit",
    placeholder: "",
    editTags: 1,
    dropdown: {
      enabled: 0,
    },
    callbacks: {} as any,
  };
  const handleChange = (e: CustomEvent) => {
    const selectedTag = e.detail.tagify.value.map(
      (item: { value: string }) => item.value
    )[0]; // Take only the first value as a string
    setState(selectedTag);
    const selectedCategory = categories.find(
      (category: blogCategory) => category.description === selectedTag
    );
    const stateId = selectedCategory ? selectedCategory?.category_id : "";
    setStateId(stateId);
  };

  const settings: TagifySettings<Tagify.BaseTagData> = {
    ...baseTagifySettings,
    whitelist: suggestions,
    editTags: false,
    backspace: "edit",
    enforceWhitelist: true,
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
    placeholder: placeholder,
  };

  return (
    <div className="flex flex-col gap-[20px]">
      <div className={`form-group shadow-primary  rounded-[8px] p-[6px]`}>
        <Tags value={state} settings={settings} readOnly={false} />
      </div>
    </div>
  );
}

export default BlogTagField;
