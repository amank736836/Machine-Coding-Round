import "./App.css";
import VirtualizedList from "./Components/VirtualizedList";

const LIST = Array.from({ length: 100000 }).map((_, index) => {
  return index + 1;
});

const App = () => {
  return (
    <VirtualizedList list={LIST} width={300} height={400} itemHeight={40} />
  );
};

export default App;
