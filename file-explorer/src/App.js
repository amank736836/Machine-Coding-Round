import "./App.css";
import FileExplorer from "./Components/FileExplorer";
import FileExplorerContextWrapper from "./context/FileExplorerContext";
function App() {
  
  return (
    <FileExplorerContextWrapper>
      <FileExplorer id={1} />
    </FileExplorerContextWrapper>
  );
}

export default App;
