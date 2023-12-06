import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import SampleImage from "@image/sampleImage.png";
import UnlinkButton from "@component/ModifyButton";

import axios from "axios";
import { toast } from "react-toastify";
import { getCookie } from "cookies-next";
import { updateAvatar } from "@/apis/profile";
import { useRouter } from "next/navigation";

type TProps = {
  image: string;
  fullName: string;
  position: string;
};

function EditAvatar({ image, fullName, position }: TProps): JSX.Element {
  const router = useRouter();
  const fileInputRef = useRef(null);
  const [imageState, setImageState] = useState<File | null>(null);
  const [imageSource, setImageSource] = useState<string | undefined | null>(
    null
  );

  const handleBrowseImage = () => {
    document.getElementById("imageImporter")?.click();
  };
  const handleOnChangeSeleteImage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files && event.target.files[0];
    if (file && isValidFileType(file)) {
      setImageState(file);
    } else {
      setImageState(null);
      alert("Invalid file type!");
    }
  };
  const isValidFileType = (file: File) => {
    const acceptedTypes = [
      "image/png",
      "image/jpeg",
      "image/gif",
      "image/jpg",
      "image/webp",
    ];
    return acceptedTypes.includes(file.type);
  };
  const handleUpdataProfileImage = async (avatarUrl: string) => {
    const user_id = getCookie("user_id") as string;
    try {
      const access_token = getCookie("accessToken");
      if (access_token && user_id) {
        const response = await updateAvatar(avatarUrl, user_id);
        console.log(avatarUrl);
        console.log(response);
        router.refresh();
        toast.success(response.data.message);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error);
        toast.error("Upload profile image failed!");
      }
    }
  };
  const handleGetImageUrl = async (
    file: File
  ): Promise<string | null | undefined> => {
    const CLOUD_NAME = "dyu2kc3bl";
    const UPLOAD_PRESET = "fu_blog_user";
    const FOLDER = "userImage";

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", UPLOAD_PRESET);
      formData.append("folder", FOLDER);
      const responseData = await axios.post(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        formData
      );
      const imageURL = responseData.data.secure_url;
      setImageSource(imageURL);
    } catch (error) {
      console.error("Error uploading image: ", error);
      return null;
    }
  };
  useEffect(() => {
    if (imageState) {
      handleGetImageUrl(imageState);
    }
  }, [imageState, setImageSource]);

  return (
    <div className="flex flex-col xl:flex-row gap-[25px] p-[24px] shadow-primary rounded-[10px]">
      <div className="w-[126px] h-[126px] rounded-[10px] overflow-hidden">
        <Image
          src={
            imageState
              ? URL.createObjectURL(imageState)
              : image == ""
              ? SampleImage
              : image
          }
          width={1200}
          height={800}
          alt="avt"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        ></Image>
      </div>
      <div className="flex flex-col gap-[16px]">
        <h3 className="font-[700] text-[24px]">
          {fullName == "" ? "Haven't set name yet" : fullName}
        </h3>
        <p className="font-[400] text-[16px]">
          {position == null ? "Not set yet" : position}
        </p>
        <div>
          <input
            type="file"
            name="file"
            id="imageImporter"
            className="hidden"
            multiple
            ref={fileInputRef}
            onChange={(event) => handleOnChangeSeleteImage(event)}
            onSubmit={() => {
              console.log("Submit");
            }}
          />
          <div className="flex flex-row gap-2 justify-between">
            <UnlinkButton
              textContent={"Change Image"}
              icon={"upload"}
              iconPosition={"left"}
              backgroundColor={"bg-blue-700"}
              method={() => handleBrowseImage()}
              tailwind={"text-white"}
            ></UnlinkButton>
            {imageSource ? (
              <UnlinkButton
                textContent={"Save"}
                icon={""}
                iconPosition={"left"}
                backgroundColor={"bg-blue-700"}
                method={() => {
                  handleUpdataProfileImage(imageSource!);
                }}
                tailwind={"text-white"}
              ></UnlinkButton>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditAvatar;
