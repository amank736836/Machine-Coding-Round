import { useContext, useState } from "react";
import { FileExplorerContext } from "../context/FileExplorerContext";

const EditInputBox = ({ id, setShowEditInput }) => {
  const [input, setInput] = useState(
    useContext(FileExplorerContext).nodes[id].name
  );
  const { editNode } = useContext(FileExplorerContext);
  return (
    <>
      <input
        className="input-box"
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <span
        onClick={() => {
          editNode(id, input);
          setShowEditInput(false);
        }}
      >
        ✅
      </span>
      <span
        onClick={() => {
          setShowEditInput(false);
        }}
      >
        ❌
      </span>
    </>
  );
};

export default EditInputBox;
