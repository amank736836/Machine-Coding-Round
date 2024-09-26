import React, { useContext, useState } from "react";
import { FileExplorerContext } from "../context/FileExplorerContext";

function FileExplorer({ id }) {
  const { nodes: data } = useContext(FileExplorerContext);
  const [showChildren, setShowChildren] = useState(false);
  return (
    <div className="container">
      <h3 onClick={() => setShowChildren(!showChildren)}>
        {data[id].type === "folder" ? (showChildren ? "🔽 📂" : "▶️ 📁") : "📄"}
        <span>{data[id].name}</span>
      </h3>
      {showChildren &&
        data[id]?.children?.map((childId, index) => {
          return <FileExplorer key={index} id={childId} />;
        })}
    </div>
  );
}

export default FileExplorer;
