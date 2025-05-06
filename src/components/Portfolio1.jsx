import React ,{useRef} from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
// import html2canvas from "html2canvas";
import html2canvas from "html2canvas-pro";

import jsPDF from "jspdf";

// fallback demo data if userData is missing
const demoData = {
  name: "Jane Doe",
  tagline: "Full Stack Developer & Creative Coder",
  bio: `I'm a passionate developer who loves building beautiful, high-performance web experiences. My focus is on React, Node.js, and UI/UX design. Let's create something amazing together!`,
  skills: [
    { name: "React", icon: "⚛️" },
    { name: "Node.js", icon: "🟩" },
    { name: "JavaScript", icon: "🟨" },
    { name: "CSS", icon: "🎨" },
    { name: "UI/UX", icon: "✨" },
  ],
  socialLinks: {
    github: "https://github.com/",
    linkedin: "https://linkedin.com/",
    instagram: "https://instagram.com/",
  },
  projects: [
    {
      name: "Portfolio Website",
      description:
        "A modern, responsive portfolio built with React and Tailwind CSS. Features smooth animations, dynamic content, and a stunning design.",
      image:
        "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
      link: "#",
    },
    {
      name: "E-Commerce App",
      description:
        "A full-featured e-commerce platform with user authentication, product management, and payment integration.",
      image:
        "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=600&q=80",
      link: "#",
    },
    {
      name: "Chat Application",
      description:
        "A real-time chat app using Socket.io and React, with beautiful UI and emoji support.",
      image:
        "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80",
      link: "#",
    },
  ],
};

const iconMap = {
  github: "🐙",
  linkedin: "🔗",
  instagram: "📸",
  twitter: "🐦",
  facebook: "📘",
};

const Portfolio1 = ({ dark }) => {
  const location = useLocation();
  const userData = location.state?.userData || demoData;
  // const userData = demoData;

  const portfolioRef = useRef();

  // Export as Image
  const handleExportImage = async () => {
    const canvas = await html2canvas(portfolioRef.current, { useCORS: true });
    const imgData = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = imgData;
    link.download = "portfolio.png";
    link.click();
  };

  // Export as PDF
  const handleExportPDF = async () => {
    const canvas = await html2canvas(portfolioRef.current, {
      useCORS: true,
      scale: 2,
    });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "px",
      format: [canvas.width, canvas.height],
    });
    pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
    pdf.save("portfolio.pdf");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-purple-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-gray-900 dark:text-gray-100 font-sans transition-colors duration-500">
      {/* Export Buttons */}
      <div className="flex gap-4 justify-end max-w-5xl mx-auto pt-8 pr-8">
        <button
          onClick={handleExportImage}
          className="px-4 py-2 rounded bg-purple-600 text-white font-semibold shadow hover:bg-purple-700 transition"
        >
          Export as Image
        </button>
        <button
          onClick={handleExportPDF}
          className="px-4 py-2 rounded bg-blue-600 text-white font-semibold shadow hover:bg-blue-700 transition"
        >
          Export as PDF
        </button>
      </div>
      <div ref={portfolioRef}>
        {/* Hero Section */}
        <section className="relative flex flex-col items-center justify-center h-[80vh] text-center">
          {/* Animated Gradient Background */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 0.2, scale: 1 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 z-0 bg-gradient-to-tr from-purple-400 via-blue-400 to-pink-400 opacity-20 blur-2xl animate-pulse"
          ></motion.div>
          <motion.h1
            className="relative z-10 text-5xl md:text-7xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100 drop-shadow-lg mb-4"
            initial={{ y: -40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7 }}
          >
            {userData.name}
          </motion.h1>
          <motion.h2
            className="relative z-10 text-2xl md:text-3xl font-medium text-purple-700 dark:text-purple-200 mb-6"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.9 }}
          >
            {userData.tagline || ""}
          </motion.h2>
          <motion.div
            className="relative z-10 flex gap-4 justify-center mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.7 }}
          >
            {userData.socialLinks &&
              Object.entries(userData.socialLinks).map(([name, url]) => (
                <a
                  key={name}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-3xl hover:scale-125 transition-transform duration-200"
                  title={name.charAt(0).toUpperCase() + name.slice(1)}
                >
                  <span>{iconMap[name.toLowerCase()] || "🔗"}</span>
                </a>
              ))}
          </motion.div>
        </section>

        {/* About/Bio Section */}
        <AnimatePresence>
          <motion.section
            className="max-w-2xl mx-auto mt-10 px-6 py-8 bg-white dark:bg-gray-800 bg-opacity-80 rounded-2xl shadow-lg"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-xl font-semibold text-purple-700 dark:text-purple-200 mb-2">
              About Me
            </h3>
            <p className="text-lg text-gray-700 dark:text-gray-200">
              {userData.bio}
            </p>
          </motion.section>
        </AnimatePresence>

        {/* Skills Section */}
        <AnimatePresence>
          <motion.section
            className="max-w-2xl mx-auto mt-10 px-6 py-8 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-lg"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.9 }}
          >
            <h3 className="text-xl font-semibold text-purple-700 dark:text-purple-200 mb-4">
              Skills
            </h3>
            <div className="flex flex-wrap gap-6 justify-center">
              {(userData.skills || []).map((skill, idx) => (
                <motion.div
                  key={skill.name || skill}
                  className="flex flex-col items-center bg-white dark:bg-gray-700 bg-opacity-80 px-4 py-3 rounded-xl shadow hover:shadow-xl transition-shadow duration-200"
                  whileHover={{ scale: 1.08 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <span className="text-3xl mb-1">{skill.icon || "💡"}</span>
                  <span className="font-medium text-gray-800 dark:text-gray-100">
                    {skill.name || skill}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.section>
        </AnimatePresence>

        {/* Projects Section */}
        <AnimatePresence>
          <motion.section
            className="max-w-5xl mx-auto mt-10 px-6 py-8"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 1 }}
          >
            <h3 className="text-2xl font-bold text-purple-700 dark:text-purple-200 mb-8 text-center">
              Projects
            </h3>
            <div className="grid md:grid-cols-3 gap-8">
              {(userData.projects || []).map((project, idx) => (
                <motion.a
                  key={project.name || idx}
                  href={project.link || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group bg-white dark:bg-gray-800 bg-opacity-90 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col"
                  whileHover={{ scale: 1.04, y: -6 }}
                  transition={{ type: "spring", stiffness: 200 }}
                >
                  {project.image && (
                    <img
                      src={project.image}
                      alt={project.name}
                      className="h-40 w-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  )}
                  <div className="p-5 flex-1 flex flex-col">
                    <h4 className="text-lg font-semibold text-purple-800 dark:text-purple-200 mb-2">
                      {project.name}
                    </h4>
                    <p className="text-gray-700 dark:text-gray-200 flex-1">
                      {project.description}
                    </p>
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.section>
        </AnimatePresence>

        {/* Footer */}
        <footer className="mt-16 mb-4 text-center text-gray-500 dark:text-gray-400">
          <span>
            &copy; {new Date().getFullYear()} {userData.name} . All rights
            reserved.
          </span>
        </footer>
      </div>
    </div>
  );
};

export default Portfolio1;
