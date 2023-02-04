import "./Class.css";
import { useState, useEffect } from "react";
import React from "react";

const Class = () => {
  const [generatedResult, setGeneratedResult] = useState();

  useEffect(() => {
    const fetchMessageGeneration = async () => {
      const result = await fetch("http://127.0.0.1:8000/by-class", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          class_year: 2016,
          last_donation: 5000,
          annual_campus_milestones: ["new wellness center"],
          ask_amount: 7,
          donation_deadline: "2023-02-04",
        }),
      });

      setGeneratedResult(await result.json());
    };

    fetchMessageGeneration();
  }, [generatedResult]);

  return (
    <div className="container">
      <div className="settings">
        <h3>Class Settings</h3>
        <div>Setting</div>
      </div>
      <div className="editor">
        <h3>Editor</h3>
        {generatedResult?.choices[0].text}
      </div>
    </div>
  );
};

export default Class;
