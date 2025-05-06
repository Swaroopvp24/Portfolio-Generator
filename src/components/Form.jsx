import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Projectcomponent from "./Projectcomponent";

const Form = ({
  userData,
  handleFormChange,
  handleAddProject,
  handleSocialLinkChange,
  dark, // Accept dark mode prop
  setDark, // Accept setDark prop (not used here, but available if needed)
}) => {
  const [newProjectName, setNewProjectName] = useState("");
  const [newProjectDescription, setNewProjectDescription] = useState("");

  const handleSubmitProject = (e) => {
    e.preventDefault();

    const wordCount = newProjectDescription.trim().split(/\s+/).length;
    if (wordCount < 50) {
      alert("Project description must be at least 50 words.");
      return;
    }

    if (newProjectName && newProjectDescription) {
      handleAddProject({
        name: newProjectName,
        description: newProjectDescription,
      });
      setNewProjectName("");
      setNewProjectDescription("");
    }
  };

  const [showInputs, setShowInputs] = useState({
    instagram: false,
    github: false,
    linkedin: false,
  });

  const navigate = useNavigate();

  const handleGenerate = () => {
    navigate("/generate", { state: { userData } });
  };
  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setShowInputs((prev) => ({
      ...prev,
      [name]: checked,
    }));

    // Remove the key if unchecked
    if (!checked) {
      handleSocialLinkChange(name, "");
    }
  };

  return (
    <>
      <h1 className="flex text-blue-900 dark:text-purple-200 text-4xl font-bold items-center justify-center flex-wrap m-2 p-2">
        Portofolio Generator
      </h1>
      <h2 className="flex text-blue-900 dark:text-purple-200 text-2xl font-bold items-center justify-center flex-wrap m-2 p-2">
        Generate your own portofolio
      </h2>
      <div className="form flex flex-col items-center justify-center m-4 p-6 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 rounded-2xl shadow-2xl max-w-lg mx-auto w-full transition-colors duration-500">
        <h2 className="text-2xl font-bold mb-4 text-purple-700 dark:text-purple-300 tracking-wide">
          Fill in your details
        </h2>
        {/* Name */}
        <label className="flex flex-col items-start w-full mb-3">
          <span className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1">
            Name:
          </span>
          <input
            className="p-2 border-2 border-purple-300 dark:border-purple-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 dark:focus:ring-purple-900 rounded-lg w-full transition-all duration-200 bg-white dark:bg-gray-900 dark:text-gray-100"
            type="text"
            name="name"
            value={userData.name}
            onChange={handleFormChange}
            placeholder="Your name"
          />
        </label>
        {/* Bio */}
        <label className="flex flex-col items-start w-full mb-3">
          <span className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1">
            Bio:
          </span>
          <textarea
            className="p-2 border-2 border-purple-300 dark:border-purple-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 dark:focus:ring-purple-900 rounded-lg w-full transition-all duration-200 bg-white dark:bg-gray-900 dark:text-gray-100 min-h-[60px]"
            name="bio"
            value={userData.bio}
            onChange={handleFormChange}
            placeholder="Write a short bio"
          />
        </label>
        {/* Skills */}
        <label className="flex flex-col items-start w-full mb-3">
          <span className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1">
            Skills:
          </span>
          <input
            className="p-2 border-2 border-purple-300 dark:border-purple-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 dark:focus:ring-purple-900 rounded-lg w-full transition-all duration-200 bg-white dark:bg-gray-900 dark:text-gray-100"
            type="text"
            name="skills"
            value={userData.skills}
            onChange={handleFormChange}
            placeholder="Skills (comma separated)"
          />
        </label>
        {/* Social Links */}
        <div className="w-full mb-6 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-gray-900 dark:to-gray-800 rounded-xl p-4 shadow-inner">
          <h3 className="text-lg font-semibold text-purple-700 dark:text-purple-300 mb-2">
            Social Links:
          </h3>
          <div className="flex flex-wrap gap-4">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="instagram"
                checked={showInputs.instagram}
                onChange={handleCheckboxChange}
                className="accent-pink-500 dark:accent-pink-700 w-4 h-4"
              />
              <span className="text-pink-600 dark:text-pink-400 font-medium">
                Instagram
              </span>
            </label>
            {showInputs.instagram && (
              <input
                className="p-2 border-2 border-pink-300 dark:border-pink-700 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 dark:focus:ring-pink-900 rounded-lg w-full mt-2 bg-white dark:bg-gray-900 dark:text-gray-100"
                type="text"
                placeholder="Instagram link"
                value={userData.socialLinks.instagram || ""}
                onChange={(e) =>
                  handleSocialLinkChange("instagram", e.target.value)
                }
              />
            )}
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="github"
                checked={showInputs.github}
                onChange={handleCheckboxChange}
                className="accent-gray-800 dark:accent-gray-200 w-4 h-4"
              />
              <span className="text-gray-800 dark:text-gray-300 font-medium">
                GitHub
              </span>
            </label>
            {showInputs.github && (
              <input
                className="p-2 border-2 border-gray-400 dark:border-gray-700 focus:border-gray-700 focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-900 rounded-lg w-full mt-2 bg-white dark:bg-gray-900 dark:text-gray-100"
                type="text"
                placeholder="GitHub link"
                value={userData.socialLinks.github || ""}
                onChange={(e) =>
                  handleSocialLinkChange("github", e.target.value)
                }
              />
            )}
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="linkedin"
                checked={showInputs.linkedin}
                onChange={handleCheckboxChange}
                className="accent-blue-600 dark:accent-blue-400 w-4 h-4"
              />
              <span className="text-blue-700 dark:text-blue-400 font-medium">
                LinkedIn
              </span>
            </label>
            {showInputs.linkedin && (
              <input
                className="p-2 border-2 border-blue-300 dark:border-blue-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-900 rounded-lg w-full mt-2 bg-white dark:bg-gray-900 dark:text-gray-100"
                type="text"
                placeholder="LinkedIn link"
                value={userData.socialLinks.linkedin || ""}
                onChange={(e) =>
                  handleSocialLinkChange("linkedin", e.target.value)
                }
              />
            )}
          </div>
        </div>
        {/* Projects */}
        <h3 className="text-lg font-semibold text-purple-700 dark:text-purple-300 mb-2">
          Projects:
        </h3>
        <Projectcomponent
          userData={userData}
          newProjectName={newProjectName}
          setNewProjectName={setNewProjectName}
          newProjectDescription={newProjectDescription}
          setNewProjectDescription={setNewProjectDescription}
          handleSubmitProject={handleSubmitProject}
        />
        <button
          type="button"
          className="cursor-pointer mt-6 px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-lg shadow-lg hover:from-pink-600 hover:to-purple-600 transition-all duration-200 text-lg tracking-wide w-full max-w-xs"
          onClick={handleGenerate}
        >
          Generate
        </button>
      </div>
    </>
  );
};

export default Form;
