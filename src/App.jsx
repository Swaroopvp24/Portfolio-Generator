import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./styles/main.css";
import Form from "./components/Form";
import Genmain from "./components/Genmain";
import Portfolio1 from "./components/Portfolio1";

function App() {
  // Custom hook for persistent dark mode
  function useDarkMode() {
    const [dark, setDark] = useState(() => {
      if (typeof window !== "undefined") {
        const ls = localStorage.getItem("color-theme");
        if (ls === "dark") return true;
        if (ls === "light") return false;
        return window.matchMedia("(prefers-color-scheme: dark)").matches;
      }
      return false;
    });

    useEffect(() => {
      if (dark) {
        document.documentElement.classList.add("dark");
        localStorage.setItem("color-theme", "dark");
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("color-theme", "light");
      }
    }, [dark]);

    return [dark, setDark];
  }

  const [userData, setUserData] = useState({
    name: "",
    bio: "",
    projects: [],
    skills: [],
    socialLinks: {},
  });

  // Use the custom hook
  const [dark, setDark] = useDarkMode();

  const handleFormChange = (e) => {
    const { name, value } = e.target;

    if (name === "skills") {
      setUserData((prevData) => ({
        ...prevData,
        [name]: value.split(",").map((skill) => skill.trim()),
      }));
    } else {
      setUserData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSocialLinkChange = (platform, value) => {
    setUserData((prevData) => ({
      ...prevData,
      socialLinks: {
        ...prevData.socialLinks,
        [platform]: value,
      },
    }));
  };

  const handleAddProject = (newProject) => {
    if (newProject.description.trim().split(/\s+/).length < 50) {
      alert("Project description must be at least 50 words.");
      return;
    }
    setUserData((prevData) => ({
      ...prevData,
      projects: [...prevData.projects, newProject],
    }));
  };

  return (
    <div className="relative min-h-screen">
      {/* Background layer */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-white via-blue-50 to-purple-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-500" />
      <Router>
        <div className="min-h-screen flex flex-col">
          {/* Dark/Light Mode Switch */}
          <div className="fixed top-4 right-4 z-50">
            <button
              onClick={() => setDark((d) => !d)}
              className="bg-white dark:bg-gray-800 border border-purple-400 dark:border-gray-600 rounded-full px-4 py-2 shadow hover:scale-105 transition-all duration-200 text-purple-700 dark:text-purple-200 font-bold"
            >
              {dark ? "🌙 Dark" : "🌞 Light"}
            </button>
          </div>

          <Routes>
            <Route
              path="/"
              element={
                <Form
                  userData={userData}
                  handleFormChange={handleFormChange}
                  handleAddProject={handleAddProject}
                  handleSocialLinkChange={handleSocialLinkChange}
                  dark={dark}
                  setDark={setDark}
                />
              }
            />
            <Route
              path="/generate"
              element={<Genmain dark={dark} setDark={setDark} />}
            />
            <Route
              path="/portfolio1"
              element={<Portfolio1 dark={dark} setDark={setDark} />}
            />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
