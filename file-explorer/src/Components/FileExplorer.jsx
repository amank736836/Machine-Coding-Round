import React, { useState } from "react";

function FileExplorer({ folderData }) {
//   console.log(folderData);
const [showChildren , setShowChildren] = useState(false);
  return (
    <div className="container">
      <h3
      onClick={() => setShowChildren(!showChildren)}
      >
        {folderData.type === "folder" ? (showChildren ? "📂" : "📁") : "📄"}
        <span>{folderData.name}</span>
      </h3>
      { showChildren &&
        folderData?.children?.map((childData , index) => {
            return <FileExplorer key = {index} folderData = {childData} />
        })
      }
    </div>
  );
}

export default FileExplorer;
