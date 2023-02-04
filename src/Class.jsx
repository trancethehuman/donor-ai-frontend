import "./Class.css";
import React from "react";
import { useGeneratedMessage } from "./generationHooks";
import { Endpoints } from "./consts";

const { CLASS: endpoint } = Endpoints;

const requestBody = {
  class_year: 2016,
  last_donation: 5000,
  annual_campus_milestones: ["new wellness center"],
  ask_amount: 7,
  donation_deadline: "2023-02-04",
};

const Class = () => {
  const { data, loading, error } = useGeneratedMessage(endpoint, requestBody);

  const displayGeneratedMessage = () => {
    if (loading) {
      return <p>Loading...</p>;
    }

    if (error) {
      return <p>Error: {error.message}</p>;
    }

    return data?.choices[0].text;
  };

  return (
    <div className="container">
      <div className="settings">
        <h3>Class Settings</h3>
        <div>Setting</div>
      </div>
      <div className="editor">
        <h3>Editor</h3>
        {displayGeneratedMessage()}
      </div>
    </div>
  );
};

export default Class;
