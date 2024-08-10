import "./App.css";
import Stepper from "./Components/Stepper";

const steps = [
  {
    label: "Personal Information",
    content: <div>Personal Information Content</div>,
  },
  {
    label: "Account Information",
    content: <div>Account Information Content</div>,
  },
  {
    label: "Payment Information",
    content: <div>Payment Information Content</div>,
  },
  {
    label: "Confirmation",
    content: <div>Confirmation Content</div>,
  },
  {
    label: "Review",
    content: <div>Review Content</div>,
  }
];

function App() {
  return <Stepper steps = {steps}/>;
}

export default App;
