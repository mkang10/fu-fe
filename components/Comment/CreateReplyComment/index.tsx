import React from "react";
import { Input } from "antd";
import DefaultAvatar from "@icons/header/defaultAvatar.svg";
import paperAirline from "@icons/components/Button/paper-airplane.svg";
import Image from "next/image";
import { getCookie } from "cookies-next";
import { addReplyComment } from "@/apis/comment";
import { toast } from "react-toastify";
import axios from "axios";
import { Socket } from "socket.io-client";
const { TextArea } = Input;
interface CreateReply {
  inputValue: string;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
  parentId: string;
  setReplyDialog: React.Dispatch<React.SetStateAction<boolean>>;
  socket: Socket;
}

function CreateReplyComment({
  inputValue,
  setInputValue,
  parentId,
  setReplyDialog,
  socket,
}: CreateReply) {
  const handleAddReply = async () => {
    const user_id = getCookie("user_id");
    const access_token = getCookie("accessToken");
    try {
      if (access_token && user_id) {
        if (inputValue !== "") {
          const replyComment = {
            user_id: user_id,
            comment_id: parentId,
            content: inputValue,
          };
          // const response = await addReplyComment(replyComment);
          socket.emit("reply", replyComment);
          toast.success("Comment posted");
          setReplyDialog(false);
          setInputValue("");
        } else {
          toast.error("Please do not leave a blank");
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
      handleAddReply();
    }
  };
  return (
    <div className=" flex w-3/5 gap-2 items-center">
      <Image src={DefaultAvatar} width={30} height={30} alt="profile"></Image>
      <TextArea
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        size="large"
        style={{ width: "100%" }}
        allowClear={true}
        placeholder="Write a comment..."
        autoSize={{ minRows: 1 }}
        onPressEnter={(e) => handleKeyPress(e)}
      />
      <button
        onClick={handleAddReply}
        className="rounded-[8px] px-[12px] py-[8px] text-[12px] bg-blue-700 hover:opacity-80"
      >
        <Image
          src={paperAirline}
          alt="icon"
          style={{
            width: "16px",
            height: "17px",
          }}
          className="rotate-90"
        />
      </button>
    </div>
  );
}

export default CreateReplyComment;
