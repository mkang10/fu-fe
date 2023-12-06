import React, { useEffect, useState } from "react";
import UnlinkButton from "@component/ModifyButton";
import EditorNormal from "@component/BioEditor";
import { getCookie } from "cookies-next";
import { updateAbout } from "@/apis/profile";

type TProps = {
  about: string;
  user_id: string;
};

function EditBio({ about, user_id }: TProps): JSX.Element {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [isSave, setIsSave] = useState<boolean>(false);
  const [htmlString, setHtmlString] = useState<string>(about);
  useEffect(() => {
    const handleUpdateBio = async () => {
      try {
        const access_token = getCookie("accessToken");
        if (access_token) {
          await updateAbout(htmlString, user_id);
        }
      } catch (error) {}
    };
    handleUpdateBio();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [htmlString]);
  return (
    <div className="flex flex-col gap-[20px] p-[24px] shadow-primary rounded-[10px]">
      <h3 className="font-[700] text-[24px] select-none ">About you</h3>
      {htmlString.length === 0 ? (
        <p className="italic">Haven&apos;t set bio yet!</p>
      ) : (
        <div dangerouslySetInnerHTML={{ __html: htmlString }}></div>
      )}
      <div>
        <UnlinkButton
          textContent={"Edit bio"}
          icon={"edit"}
          iconPosition={"left"}
          backgroundColor={"bg-blue-700"}
          method={() => {
            setIsEdit((isEdit) => !isEdit);
          }}
          tailwind={"text-white"}
        ></UnlinkButton>
      </div>
      {isEdit ? (
        <>
          <EditorNormal
            htmlString={htmlString}
            setHtmlString={setHtmlString}
            isNeedSave={true}
            useEditorFor={"about"}
          />
        </>
      ) : null}
    </div>
  );
}

export default EditBio;
