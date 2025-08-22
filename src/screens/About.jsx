import React from "react";

const About = () => {
  return (
    <div className="p-4 pb-5">
      <h1 className="text-4xl font-extrabold mb-4">About</h1>
      <p>
        En esta app voy a estar practicando conceptos aprendidos de React y
        NodeJs
      </p>
      <p>Algunos de estos conceptos son:</p>
      <br />
      <ul className="list-disc list-inside">
        <li>ReactJS</li>
        <li>React Router</li>
        <li>NodeJS</li>
        <li>ExpressJS</li>
        <li>MongoDB</li>
        <li>TailwindCSS</li>
      </ul>
    </div>
  );
};

export default About;
