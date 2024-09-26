import { useState } from "react";
import ReplyComment from "./ReplyComment";
import { useCommentsContext } from "../Context/commentsContext";

export default function CommentBox({ id }) {
  const { comments, deleteComment } = useCommentsContext();
  const [showReplyBox, setShowReplyBox] = useState(false);
  const handleReply = () => {
    setShowReplyBox(!showReplyBox);
  };
  return (
    <div className="comment-container">
      <div className="comment-header">
        <p className="comment-value">{comments[id].value}</p>
        <div className="comment-actions">
          <button className="reply-btn" onClick={handleReply}>
            {showReplyBox ? "Cancel" : "Reply"}
          </button>
          <button className="delete-btn" onClick={() => deleteComment(id)}>
            Delete
          </button>
        </div>
      </div>
      {showReplyBox && (
        <ReplyComment setShowReplyBox={setShowReplyBox} parentId={id} />
      )}
      <div className="nested-comments">
        {comments[id].children.map((childId) => {
          return <CommentBox key={childId} id={childId} />;
        })}
      </div>
    </div>
  );
}
