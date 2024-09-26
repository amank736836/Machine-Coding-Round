import "./App.css";
import CommentBox from "./Components/CommentBox";
import { useState } from "react";
import commentsData from "./commentsData.json";

function App() {
  const [comments, setComments] = useState(commentsData.comments);

  const addComment = (value, parentId) => {
    const newId = Date.now();
    const newComment = {
      id: newId,
      parentId,
      value,
      children: [],
    };
    setComments((prevComments) => {
      prevComments[parentId].children.push(newId);
      return { ...prevComments, [newId]: newComment };
    });
  };

  const deleteComment = (id) => {
    const parentId = comments[id].parentId;
    setComments((prevComments) => {
      const newComments = { ...prevComments };
      if (parentId) {
        const parent = newComments[parentId];
        parent.children = parent.children.filter((childId) => childId !== id);
      }
      const queue = [id];
      while (queue.length) {
        const currentId = queue.pop();
        queue.push(...newComments[currentId].children);
        delete newComments[currentId];
      }
      return newComments;
    });
  };

  return (
    <CommentBox
      comment={comments[1]}
      allComments={comments}
      addComment={addComment}
      deleteComment={deleteComment}
    />
  );
}

export default App;
