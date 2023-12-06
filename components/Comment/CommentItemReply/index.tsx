"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import DefaultAvatar from "@icons/header/defaultAvatar.svg";
import { timeAgo } from "@/utils/dayFormat";
import { CommentReply } from "@/utils/types";
import { getCookie } from "cookies-next";
import { Socket } from "socket.io-client";
import { checkedLikedCommentReply, getCommentReplyLike } from "@/apis/like";

interface CommentProps {
  value: CommentReply;
  socket: Socket;
}

function CommentItemReply({ value, socket }: CommentProps) {
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [numberOfLike, setNumberOfLike] = useState<number>(0);
  const access_token = getCookie("accessToken");
  const user_id = getCookie("user_id");
  const handleLikeComment = () => {
    try {
      if (access_token && user_id) {
        const newCommentLike = {
          user_id: user_id,
          comment_id: value.commentReply_id,
        };
        socket.emit("like-comment-reply", newCommentLike);
        setIsLiked(true);
      }
    } catch (error) {
      console.error("Error liking the blog comment:", error);
    }
  };

  const handleUnlikeComment = () => {
    try {
      if (access_token && user_id) {
        const unLikeComment = {
          user_id: user_id,
          comment_id: value.commentReply_id,
        };
        socket.emit("unlike-comment-reply", unLikeComment);
        setIsLiked(false);
      }
    } catch (error) {
      console.error("Error liking the blog comment:", error);
    }
  };

  const handleGetCommentLike = async () => {
    try {
      if (access_token && value.commentReply_id) {
        const response = await getCommentReplyLike(
          access_token,
          value.commentReply_id
        );
        setNumberOfLike(response.data);
      }
    } catch (error) {
      console.error("Error fetching like the blog comment:", error);
    }
  };

  const handleUpdateCommentLike = () => {
    handleGetCommentLike();
  };

  useEffect(() => {
    handleGetCommentLike();
    socket.on("comment-reply-liked", handleUpdateCommentLike);

    return () => {
      socket.off("comment-reply-liked", handleUpdateCommentLike);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    handleGetCommentLike();
    socket.on("comment-reply-unliked", handleUpdateCommentLike);

    return () => {
      socket.off("comment-reply-unliked", handleUpdateCommentLike);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (access_token && value.commentReply_id && user_id) {
      const checkLiked = async () => {
        const liked = await checkedLikedCommentReply(
          access_token,
          user_id,
          value.commentReply_id
        );
        if (liked.data) {
          setIsLiked(true);
        }
      };
      checkLiked();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="w-full flex items-start gap-2">
      <Image
        src={value.user_image ?? DefaultAvatar}
        width={40}
        height={40}
        alt="profile"
        style={{ width: "40px", height: "40px" }}
        className="object-cover rounded-[50%]"
      ></Image>
      <div className="w-full flex flex-col ">
        <div className="flex-col w-fit bg-[#F5F5F5] px-3 py-2 rounded-xl">
          <div className="flex flex-row gap-4 items-center">
            <div className="text-base font-semibold">{value.user_name}</div>
          </div>
          <div className="text-base font-medium">{value.content}</div>
        </div>
        <div className="flex-row flex gap-5 items-center px-3 py-1">
          <div className="flex flex-row gap-2 items-center">
            <div
              onClick={isLiked ? handleUnlikeComment : handleLikeComment}
              className={`text-xs font-medium cursor-pointer hover:underline ${
                isLiked ? "text-[#FF0000]" : "text-black"
              }`}
            >
              Like
            </div>
            <div className="text-xs font-medium cursor-default">
              {numberOfLike === 0 ? "" : numberOfLike}
            </div>
          </div>
          <div className="text-[10px] text-gray-500">
            {timeAgo(value.created_at)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CommentItemReply;
