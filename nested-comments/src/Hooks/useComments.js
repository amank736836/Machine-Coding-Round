import { useCallback, useState } from "react";

const useComments = (commentsData) => {
  const [comments, setComments] = useState(commentsData.comments);

  const addComment = useCallback((value, parentId = null) => {
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
  }, []);

  const deleteComment = useCallback((id) => {
    const parentId = comments[id].parentId;
    setComments((prevComments) => {
      const newComments = { ...prevComments };
      if (parentId) {
        const parent = newComments[parentId];
        parent.children = parent.children.filter((childId) => childId !== id);
        const queue = [id];
        while (queue.length) {
          const currentId = queue.pop();
          queue.push(...newComments[currentId].children);
          delete newComments[currentId];
        }
      }
      return newComments;
    });
  }, []);

  return { comments, addComment, deleteComment };
};

export default useComments;
