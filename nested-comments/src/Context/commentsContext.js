import React, { createContext, useContext } from "react";
import useComments from "../Hooks/useComments";

const CommentsContext = createContext();

export function CommentsProvider({ children, commentsData }) {
  const { comments, addComment, deleteComment } = useComments(commentsData);

  return (
    <CommentsContext.Provider value={{ comments, addComment, deleteComment }}>
      {children}
    </CommentsContext.Provider>
  );
}

export function useCommentsContext() {
  return useContext(CommentsContext);
}
