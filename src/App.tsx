import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Navbar from "./components/nav-bar";
import CodingPage from "./Pages/CodingPage";

export default function App() {
  return (
    <>
      <BrowserRouter>
          <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/code" element={<CodingPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
