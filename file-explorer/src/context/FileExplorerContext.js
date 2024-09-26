import { createContext } from "react";
import data from "../FileExplorerData.json";

export const FileExplorerContext = createContext();

export default function FileExplorerContextWrapper({ children }) {
  const [nodes, setNodes] = useState(data.fileExplorerData);
  return (
    <FileExplorerContext.Provider value={{ nodes }}>
      {children}
    </FileExplorerContext.Provider>
  );
}
