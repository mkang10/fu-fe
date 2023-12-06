import React from "react";
import { Input } from "antd";
import Image from "next/image";
import ModifyButton from "@component/ModifyButton";
import { getCookie } from "cookies-next";
import { useParams } from "next/navigation";
import { toast } from "react-toastify";
import axios from "axios";
import { Socket } from "socket.io-client";
import DefaultAvatar from "@icons/header/defaultAvatar.svg";

interface CreateCommentProps {
  inputValue: string;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
  socket: Socket;
}
const { TextArea } = Input;

function CreateComment({
  inputValue = "",
  setInputValue,
  socket,
}: CreateCommentProps) {
  const param = useParams();
  const hanldeSubmitComment = async () => {
    const accessToken = getCookie("accessToken");
    const user_id = getCookie("user_id");
    try {
      if (accessToken && user_id && socket) {
        if (inputValue === "") {
          toast.error("Please do not leave a blank");
        } else {
          const newComment = {
            blog_id: param.blogId as string,
            user_id: user_id,
            content: inputValue,
          };
          // const response = await addComment(newComment);
          socket.emit("new-comment", newComment);
          toast.success("Comment posted");
          setInputValue("");
        }
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.log(err);
      }
    }
  };
  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      hanldeSubmitComment();
    }
  };

  return (
    <>
      <div className="w-4/5 flex flex-row items-center gap-3">
        <Image src={DefaultAvatar} width={40} height={40} alt="profile"></Image>
        <TextArea
          value={inputValue}
          size="large"
          style={{ width: "100%" }}
          onChange={(e) => setInputValue(e.target.value)}
          allowClear={true}
          placeholder="Write a comment..."
          autoSize={{ minRows: 1 }}
          onPressEnter={(e) => handleKeyPress(e)}
        />
        <div>
          <ModifyButton
            textContent={"Comment"}
            icon={""}
            iconPosition={"left"}
            backgroundColor={"bg-blue-700"}
            method={() => {
              hanldeSubmitComment();
            }}
            tailwind={"text-white hover:opacity-80"}
          ></ModifyButton>
        </div>
      </div>
    </>
  );
}

export default CreateComment;
