import { useContext, useState } from "react";
import { FileExplorerContext } from "../context/FileExplorerContext";
import InputBox from "./InputBox";

function FileExplorer({ id }) {
  const {
    nodes: data,
    deleteNode,
    addNode,
    editNode,
  } = useContext(FileExplorerContext);
  const [showChildren, setShowChildren] = useState(false);
  const [showAddInput, setShowAddInput] = useState(false);
  const [showEditInput, setShowEditInput] = useState(false);
  return (
    <div className="container">
      <h3>
        <span onClick={() => setShowChildren(!showChildren)}>
          {data[id].type === "folder"
            ? showChildren
              ? "🔽 📂"
              : "▶️ 📁"
            : "📄"}
          <span>
            {showEditInput ? (
              <InputBox
                id={id}
                name={data[id].name}
                submit={editNode}
                cancel={() => setShowEditInput(false)}
              />
            ) : (
              data[id].name
            )}
            {data[id].type === "folder" ? (
              data[id].children.length === 0 ? (
                <span>🔒</span>
              ) : (
                <span>🔓</span>
              )
            ) : null}
          </span>
        </span>
        <span onClick={() => setShowEditInput(!showEditInput)}>🖋️</span>
        {data[id].type === "folder" && (
          <span onClick={() => setShowAddInput(!showAddInput)}>➕</span>
        )}
        <span onClick={() => deleteNode(id)}>🗑️</span>
      </h3>
      {showAddInput && (
        <InputBox
          id={id}
          submit={addNode}
          cancel={() => setShowAddInput(false)}
        />
      )}

      {showChildren &&
        data[id].children?.map((childId, index) => {
          return <FileExplorer key={index} id={childId} />;
        })}
    </div>
  );
}

export default FileExplorer;
