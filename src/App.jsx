import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Weather from "./pages/Weather";
import Test from "./pages/Test";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="weather" element={<Weather />} />
          <Route path="prototype" element={<Test />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
