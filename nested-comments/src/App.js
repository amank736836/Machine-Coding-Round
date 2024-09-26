import "./App.css";
import CommentBox from "./Components/CommentBox";
import { useCommentsContext } from "./Components/commentsContext";

function App() {
  const { comments } = useCommentsContext();
  return <CommentBox comment={comments[1]} />;
}

export default App;
