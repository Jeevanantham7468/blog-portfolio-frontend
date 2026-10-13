import React from "react";
import Footer from "./common/Footer";

const skills = [
  { name: "React", level: "Frontend library" },
  { name: "Node.js & Express", level: "Backend APIs" },
  { name: "MongoDB & Mongoose", level: "Database" },
  { name: "Firebase Auth", level: "Authentication" },
  { name: "HTML, CSS & Tailwind", level: "UI & styling" },
  { name: "JavaScript", level: "Core language" },
];

function About() {
  return (
    <div className="py-14">
      <h2 className="text-center text-5xl font-bold mb-10">
        About <span className="text-orange-400">Me</span>
      </h2>

      <div className="max-w-3xl mx-auto px-4">
        <p className="text-gray-700 mb-4">
          Hi, I'm <span className="font-semibold">Jacky Thomas</span> — a full stack web developer
          who enjoys turning ideas into fast, accessible and reliable web applications.
        </p>
        <p className="text-gray-700 mb-8">
          I work across the stack: React on the frontend, Node.js and Express on the backend, and
          MongoDB for data. This portfolio is built with exactly that stack — a React frontend, an
          Express + MongoDB API, and Firebase email/password authentication that protects the admin
          area where blog posts are managed.
        </p>

        <h3 className="text-2xl font-semibold mb-4 text-gray-800">What I work with</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {skills.map((skill) => (
            <div
              key={skill.name}
              className="bg-white shadow rounded-lg p-4 border-l-4 border-orange-400"
            >
              <p className="font-semibold text-gray-800">{skill.name}</p>
              <p className="text-sm text-gray-500">{skill.level}</p>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default About;
