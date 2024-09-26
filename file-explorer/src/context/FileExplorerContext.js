import { createContext, useState } from "react";
import data from "../FileExplorerData.json";
import { type } from "@testing-library/user-event/dist/type";

export const FileExplorerContext = createContext();

export default function FileExplorerContextWrapper({ children }) {
  const [nodes, setNodes] = useState(data.fileExplorerData);

  const addNode = (parentId, value) => {
    const newNodes = { ...nodes };
    const id = Date.now();
    newNodes[parentId].children.push(id);
    const isFile = value.includes(".");
    newNodes[id] = {
      id,
      name: value,
      type: isFile ? "file" : "folder",
      parentId,
    };
    if (!isFile) {
      newNodes[id].children = [];
    }

    setNodes(newNodes);
  };

  const deleteNode = (id) => {
    const newNodes = { ...nodes };
    const parent = newNodes[id].parentId;
    if (parent) {
      newNodes[parent].children = newNodes[parent].children.filter(
        (childId) => childId !== id
      );
      const queue = [id];
      while (queue.length) {
        const currentId = queue.pop();
        if (newNodes[currentId].type === "folder") {
          queue.push(...newNodes[currentId].children);
        }
        delete newNodes[currentId];
      }
    }
    setNodes(newNodes);
  };

  const editNode = (id, value) => {
    const newNodes = { ...nodes };
    newNodes[id].name = value;
    setNodes(newNodes);
  };

  return (
    <FileExplorerContext.Provider
      value={{ nodes, deleteNode, addNode, editNode }}
    >
      {children}
    </FileExplorerContext.Provider>
  );
}
