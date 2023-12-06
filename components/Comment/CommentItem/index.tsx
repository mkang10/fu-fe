"use client";
import React, { useEffect, useState } from "react";
import DefaultAvatar from "@icons/header/defaultAvatar.svg";
import Image from "next/image";
import CreateReplyComment from "../CreateReplyComment";
import { Comment, CommentReply } from "@/utils/types";
import { timeAgo } from "@/utils/dayFormat";
import CommentReplyItem from "../CommentReplyItem";
import { getCookie } from "cookies-next";
import { getAllReply } from "@/apis/comment";
import { Socket } from "socket.io-client";
import { checkedLikedComment, getCommentLike } from "@/apis/like";
import { MoreOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Dropdown } from "antd";
import { toast } from "react-toastify";
interface CommentItemProps {
  comment: Comment;
  socket: Socket;
}

function CommentItem({ comment, socket }: CommentItemProps) {
  const access_token = getCookie("accessToken");
  const user_id = getCookie("user_id");

  const [isLiked, setIsLiked] = useState<boolean>();
  const [replyDialog, setReplyDialog] = useState<boolean>(false);
  const [numberOfLike, setNumberOfLike] = useState<number>(0);

  const [inputReply, setInputReply] = useState<string>("");
  const [commentReplyItems, setCommentReplyItems] = useState<CommentReply[]>(
    []
  );

  const [isHovered, setIsHovered] = useState<boolean>(false);

  const handleDeleteComment = () => {
    try {
      if (access_token && user_id) {
        const deleteComment = {
          user_id: comment.user_id,
          comment_id: comment.comment_id,
        };
        socket.emit("delete-comment", deleteComment);
        toast.error("Comment deleted");
      }
    } catch (error) {
      console.error("Error deleting the blog comment:", error);
    }
  };

  useEffect(() => {
    if (access_token && comment.comment_id && user_id) {
      const checkLiked = async () => {
        const liked = await checkedLikedComment(
          access_token,
          user_id,
          comment.comment_id
        );
        if (liked.data) {
          setIsLiked(true);
        }
      };
      checkLiked();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleGetReply = async () => {
    try {
      if (access_token) {
        const response = await getAllReply(comment.comment_id, access_token);
        setCommentReplyItems(response.data);
      }
    } catch (error) {}
  };

  const handleUpdateReply = () => {
    handleGetReply();
  };

  useEffect(() => {
    handleGetReply();
    socket.on("replied", handleUpdateReply);
    return () => {
      socket.off("replied", handleUpdateReply);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    handleGetReply();
    socket.on("comment-updated", handleUpdateReply);
    return () => {
      socket.off("comment-updated", handleUpdateReply);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLikeComment = () => {
    try {
      if (access_token && user_id) {
        const newCommentLike = {
          user_id: user_id,
          comment_id: comment.comment_id,
        };
        socket.emit("like-comment", newCommentLike);
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
          comment_id: comment.comment_id,
        };
        socket.emit("unlike-comment", unLikeComment);
        setIsLiked(false);
      }
    } catch (error) {
      console.error("Error liking the blog comment:", error);
    }
  };

  const handleGetCommentLike = async () => {
    try {
      if (access_token && comment.comment_id) {
        const response = await getCommentLike(access_token, comment.comment_id);
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
    socket.on("comment-liked", handleUpdateCommentLike);

    return () => {
      socket.off("comment-liked", handleUpdateCommentLike);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    handleGetCommentLike();
    socket.on("comment-unliked", handleUpdateCommentLike);

    return () => {
      socket.off("comment-unliked", handleUpdateCommentLike);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleReplyComment = () => {
    setReplyDialog(!replyDialog);
  };
  const filteredComments = commentReplyItems.filter(
    (reply) => reply.comment_id === comment.comment_id
  );

  const items: MenuProps["items"] = [
    {
      label: "Hide comment",
      key: "0",
    },
    {
      label: "Delete comment",
      key: "1",
      danger: true,
      onClick: () => {
        handleDeleteComment();
      },
    },
  ];

  return (
    <div key={comment.comment_id} className="w-full flex flex-col gap-2">
      <div className="w-full flex items-start gap-2">
        <Image
          src={comment.user_image ?? DefaultAvatar}
          width={40}
          height={40}
          alt="profile"
          style={{ width: "40px", height: "40px" }}
          className="object-cover rounded-[50%]"
        ></Image>
        <div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="w-full flex flex-col"
        >
          <div className="flex flex-row gap-2 items-center">
            <div className="flex-col w-fit bg-[#F5F5F5] px-3 py-2 rounded-xl">
              <div className="flex flex-row gap-4 items-center">
                <div className="text-base font-semibold">
                  {comment.user_name}
                </div>
              </div>
              <div className="text-base font-medium">{comment.content}</div>
            </div>
            {isHovered && comment.user_id === user_id && (
              <Dropdown
                className="cursor-pointer"
                menu={{ items }}
                trigger={["click"]}
              >
                <div>
                  <div className="rotate-90 p-1 bg-[#F5F5F5] rounded-[50%] flex justify-center items-center">
                    <MoreOutlined style={{ fontSize: "16px" }} />
                  </div>
                </div>
              </Dropdown>
            )}
          </div>
          <div className="flex-row flex gap-5 items-center px-3 py-1">
            <div className="flex flex-row gap-1 items-center">
              <div
                onClick={isLiked ? handleUnlikeComment : handleLikeComment}
                className={`text-xs font-medium cursor-pointer hover:underline ${
                  isLiked ? "text-[#FF0000]" : "text-black"
                }`}
              >
                Like
              </div>
              <div className="text-xs font-bold cursor-default">
                {numberOfLike === 0 ? "" : numberOfLike}
              </div>
            </div>
            <div
              onClick={handleReplyComment}
              className="text-xs font-medium cursor-pointer hover:underline"
            >
              Reply
            </div>
            <div className="text-[10px] text-gray-500">
              {timeAgo(comment.created_at)}
            </div>
          </div>
          <div className="w-full mt-[2px]">
            <div className="px-3 border-l-2`">
              <CommentReplyItem socket={socket} comment={filteredComments} />
            </div>
            {replyDialog && (
              <CreateReplyComment
                socket={socket}
                setReplyDialog={setReplyDialog}
                inputValue={inputReply}
                setInputValue={setInputReply}
                parentId={comment.comment_id}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CommentItem;
