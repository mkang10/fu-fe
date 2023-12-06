import React, { useState } from "react";
import Tags from "@yaireo/tagify/dist/react.tagify";
import { TagifySettings } from "@yaireo/tagify";
import "@component/ElementsSetting/TagField/Styling.scss";
import { blogTags } from "@/utils/types";

interface TagFieldProps {
  allowTagNumber: number;
  suggestions: string[];
  setState: React.Dispatch<React.SetStateAction<string[]>>;
  state: string[];
  placeholder: string;
  tags: blogTags[];
  setBlogTagsId: React.Dispatch<React.SetStateAction<string[]>>;
}

function BlogTagField({
  allowTagNumber,
  suggestions = [],
  setState,
  state,
  placeholder,
  tags,
  setBlogTagsId,
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
  const [data, setData] = useState<string[]>(state);

  const handleChange = (e: CustomEvent) => {
    const selectedTags = e.detail.tagify.value.map(
      (item: { value: string }) => item.value
    );
    setData(selectedTags);
    const selectedTagsIds = selectedTags.map((tag: string) => {
      const foundTag = tags.find((t) => t.title === tag);
      return foundTag?.tag_id;
    });
    setBlogTagsId(selectedTagsIds);
  };

  // console.log(data);
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
