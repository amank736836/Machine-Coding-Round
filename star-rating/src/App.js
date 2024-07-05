import "./App.css";
import StarRating from "./Components/StarRating";

function App() {
  return (
    <div className="App">
      <div className="div1"></div>
      <StarRating starCount={10} />
      <div className="div2"></div>
    </div>
  );
}

export default App;
