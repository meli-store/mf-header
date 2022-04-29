import { Navbar } from "./components/Navbar";
import { BrowserRouter } from "react-router-dom";

export default function Root(props) {
  return (
    <BrowserRouter>
      <Navbar />
    </BrowserRouter>
  );
}
