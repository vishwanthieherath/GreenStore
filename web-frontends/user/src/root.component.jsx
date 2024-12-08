import App from "./App.jsx";
import { BrowserRouter as Router } from "react-router-dom";
// import "./tailwind.css";

export default function Root(props) {
  return (
    <Router>
      <App />
    </Router>
  );
}
