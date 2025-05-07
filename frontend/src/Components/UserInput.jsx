import React from 'react'

import { useState } from "react";

function UserInput({ onSubmit }) {
  const [name, setName] = useState("");
  const [currentJob, setCurrentJob] = useState("");
  const [skills, setSkills] = useState("");
  const [requiredJob, setRequiredJob] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ 
        name, 
        current_job: currentJob, 
        skills: skills.split(",").map(skill => skill.trim()), 
        required_job: requiredJob 
      }),
    });

    if (response.ok) {
      const result = await response.json();
      onSubmit(result); 
    } else {
      console.error("Failed to submit data");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Your Career Roadmap</h2>

        <input
          type="text"
          placeholder="Your Name"
          className="w-full p-2 mb-4 border border-gray-300 rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Current Job (e.g. Full Stack Developer)"
          className="w-full p-2 mb-4 border border-gray-300 rounded"
          value={currentJob}
          onChange={(e) => setCurrentJob(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Skills (comma-separated)"
          className="w-full p-2 mb-4 border border-gray-300 rounded"
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Required Job Title"
          className="w-full p-2 mb-6 border border-gray-300 rounded"
          value={requiredJob}
          onChange={(e) => setRequiredJob(e.target.value)}
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Generate Roadmap
        </button>
      </form>
    </div>
  );
}

export default UserInput;