import React, { useState, useEffect } from "react";
import CreateComment from "@/components/Comment/CreateComment";
import CommentList from "@component/Comment/CommentList";
import { useParams } from "next/navigation";
import { getAllComments } from "@/apis/comment";
import { getCookie } from "cookies-next";
import { Comment } from "@/utils/types";
import { Socket } from "socket.io-client";
interface CommentProps {
  socket: Socket;
}

function Comment({ socket }: CommentProps) {
  const [inputValue, setInputValue] = useState<string>("");
  const [blogComments, setBlogComments] = useState<Comment[]>([]);
  const param = useParams();
  const handleGetAllComments = async () => {
    const blog_id = param.blogId as string;
    const access_token = getCookie("accessToken");
    try {
      if (access_token) {
        const response = await getAllComments(blog_id, access_token);
        setBlogComments(response.data);
      }
    } catch (error) {}
  };

  const handleCommentUpdated = () => {
    handleGetAllComments();
  };

  useEffect(() => {
    handleGetAllComments();
    socket.on("comment-updated", handleCommentUpdated);
    return () => {
      socket.off("comment-updated", handleCommentUpdated);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  console.log(blogComments);

  return (
    <>
      <div className="w-full pt-[20px]  pb-[40px] gap-5 flex flex-col">
        <div className="text-2xl font-bold text-[#14375F] ">Comments</div>
        <CreateComment
          socket={socket}
          inputValue={inputValue}
          setInputValue={setInputValue}
        ></CreateComment>
        {blogComments.length === 0 ? (
          <div className="p-5 bg-[#F5F5F5] text-center rounded-lg text-gray-500 font-semibold">
            Be the first person to share your thoughts!
          </div>
        ) : (
          <CommentList
            socket={socket}
            blogComments={blogComments}
          ></CommentList>
        )}
      </div>
    </>
  );
}

export default Comment;
