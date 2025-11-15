import "./App.css";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar.jsx";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Projects from "./pages/Projects.jsx";
import Education from "./pages/Education.jsx";
import Services from "./pages/Services.jsx";
import Contact from "./pages/Contact.jsx";
import SigninPage from "./pages/SigninPage.jsx";

export default function App() {
  return (
    <>
      <NavBar />
      <div style={{ padding: 16 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/education" element={<Education />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/signin" element={<SigninPage />} />
        </Routes>
      </div>
    </>
  );
}
