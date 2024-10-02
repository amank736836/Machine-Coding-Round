import "./App.css";
import DragAndDrop from "./components/DragAndDrop";

const initialData = {
  Todo: [
    "Design UI mockups",
    "Set up project repository",
    "Write unit test",
    "Integrate Payment Gateway",
  ],
  InProgress: ["Develop authentication flow", "Implement responsive design"],
  Completed: [
    "Set up CI/CD pipeline",
    "Conduct code review",
    "Deploy initial version to staging",
  ],
};

function App() {
  return <DragAndDrop initialState={initialData} />;
}

export default App;
