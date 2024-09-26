import { useState } from "react";
import ReplyComment from "./ReplyComment";
import { useCommentsContext } from "./commentsContext";

export default function CommentBox({ comment }) {
  const { comments, deleteComment } = useCommentsContext();
  const [showReplyBox, setShowReplyBox] = useState(false);
  const handleReply = () => {
    setShowReplyBox(!showReplyBox);
  };
  return (
    <div className="comment-container">
      <div className="comment-header">
        <p className="comment-value">{comment.value}</p>
        <div className="comment-actions">
          <button className="reply-btn" onClick={handleReply}>
            {showReplyBox ? "Cancel" : "Reply"}
          </button>
          <button
            className="delete-btn"
            onClick={() => deleteComment(comment.id)}
          >
            Delete
          </button>
        </div>
      </div>
      {showReplyBox && (
        <ReplyComment setShowReplyBox={setShowReplyBox} parentId={comment.id} />
      )}
      <div className="nested-comments">
        {comment.children.map((childId) => {
          return <CommentBox key={childId} comment={comments[childId]} />;
        })}
      </div>
    </div>
  );
}
