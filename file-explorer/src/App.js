import "./App.css";
import FileExplorer from "./Components/FileExplorer";
import data from "./data";
function App() {
  return <FileExplorer folderData={data} />;
}

export default App;
