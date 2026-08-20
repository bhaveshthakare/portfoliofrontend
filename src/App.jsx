import { Toaster } from "react-hot-toast";
import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import Skills from "./components/Skills.jsx";
import Experience from "./components/Experience.jsx";
import Education from "./components/Education.jsx";
import Resume from "./components/Resume.jsx";
import Certificates from "./components/Certificates.jsx";
import Projects from "./components/Projects.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";

export default function App() {
  return (
    <div className="min-h-screen bg-navy text-ink overflow-x-hidden">
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#16203a",
            color: "#e2e8f0",
            border: "1px solid #33415f",
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "13px",
          },
        }}
      />
      <Navbar />
      <main>
        <Hero />
        <Skills />
        <Experience />
        <Education />
        <Resume />
        <Certificates />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
