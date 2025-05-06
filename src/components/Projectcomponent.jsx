import React from "react";

const Projectcomponent = ({
  userData,
  newProjectName,
  setNewProjectName,
  newProjectDescription,
  setNewProjectDescription,
  handleSubmitProject,
}) => {
  return (
    <>
      <form
        onSubmit={handleSubmitProject}
        className="flex flex-col items-center justify-center w-full bg-white rounded-xl shadow p-4 mb-4"
      >
        <input
          className="p-2 border-2 border-purple-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 rounded-lg w-full mb-2 transition-all duration-200"
          type="text"
          value={newProjectName}
          onChange={(e) => setNewProjectName(e.target.value)}
          placeholder="Project Name"
        />
        <textarea
          className="p-2 border-2 border-purple-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 rounded-lg w-full mb-2 transition-all duration-200 min-h-[60px]"
          value={newProjectDescription}
          onChange={(e) => setNewProjectDescription(e.target.value)}
          placeholder="Project Description (at least 50 words)"
        />
        <button
          type="submit"
          className="cursor-pointer mt-2 px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-lg shadow hover:from-pink-600 hover:to-purple-600 transition-all duration-200"
        >
          Add Project
        </button>
      </form>

      {/* Project List */}
      <ul className="w-full mt-2">
        {userData.projects.map((project, index) => (
          <li
            key={index}
            className="mb-4 p-3 bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg shadow-sm border-l-4 border-purple-400"
          >
            <strong className="text-purple-700">{project.name}</strong>
            <p className="text-sm text-gray-700 mt-1">{project.description}</p>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Projectcomponent;
