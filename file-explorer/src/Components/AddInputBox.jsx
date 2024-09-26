import { useContext, useState } from "react";
import { FileExplorerContext } from "../context/FileExplorerContext";

const AddInputBox = ({ id, setShowAddInput }) => {
  const [input, setInput] = useState("");
  const { addNode } = useContext(FileExplorerContext);
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
          addNode(id, input);
          setShowAddInput(false);
        }}
      >
        ✅
      </span>
      <span
        onClick={() => {
          setShowAddInput(false);
        }}
      >
        ❌
      </span>
    </>
  );
};

export default AddInputBox;
