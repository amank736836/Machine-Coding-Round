import { useState } from "react";
import { useCommentsContext } from "../Context/commentsContext";

export default function ReplyComment({ setShowReplyBox, parentId }) {
  const { addComment } = useCommentsContext();
  const [reply, setReply] = useState("");
  const handlePostReply = () => {
    addComment(reply, parentId);
    setShowReplyBox(false);
    setReply("");
  };

  return (
    <div className="reply-form">
      <textarea
        className="reply-textarea"
        value={reply}
        onChange={(e) => setReply(e.target.value)}
        placeholder="Write a reply..."
      ></textarea>
      <button className="post-reply-btn" onClick={handlePostReply}>
        Post Reply
      </button>
    </div>
  );
}
