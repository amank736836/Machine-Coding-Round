import "./App.css";
import FAQ from "./Components/FAQ";
import data from "./Data/faq.json";

function App() {
  return <FAQ data={data.faqs} />;
}

export default App;
