import React from "react";
import { CommentReply } from "@/utils/types";
import CommentItemReply from "../CommentItemReply";
import { Socket } from "socket.io-client";
interface CommentReplyItemProps {
  comment: CommentReply[];
  socket: Socket;
}

function CommentReplyItem({ comment, socket  }: CommentReplyItemProps) {
  return (
    <div className="w-full px-3 mt-2 flex flex-col  gap-2 ">
      {comment.map((comment) => (
        <CommentItemReply
          key={comment.commentReply_id}
          socket={socket}
          value={comment}
        ></CommentItemReply>
      ))}
    </div>
  );
}

export default CommentReplyItem;
