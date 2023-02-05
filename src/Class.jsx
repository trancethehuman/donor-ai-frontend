import "./Class.css";
import React, { useState, useCallback } from "react";
import { Endpoints } from "./consts";
import { Button } from "@fluentui/react-components";
import SettingInputField from "./SettingInputField";

const { CLASS: endpoint } = Endpoints;

const requestBody = {
  class_year: 2016,
  last_donation: 5000,
  annual_campus_milestones: ["new wellness center"],
  ask_amount: 7,
  donation_deadline: "2023-02-04",
};

const Class = () => {
  const [generatedMessage, setGeneratedMessage] = useState(null);
  const [emptyEditor, setEmptyEditor] = useState(true);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);

  const [year, setYear] = useState();
  const [lastDonation, setlLastDonation] = useState();
  const [askAmount, setAskAmount] = useState();
  const [news, setNews] = useState();
  const [deadline, setDeadline] = useState();
  const [classSettings, setClassSettings] = useState();

  const displayGeneratedMessage = () => {
    if (emptyEditor) {
      return <p>Welcome to Denison's AI Assisted Donation Campaign!</p>;
    }
    if (loading) {
      return <p>Generating...(this could take a few seconds)</p>;
    }

    if (error) {
      return <p>Error: {error.message}</p>;
    }

    return generatedMessage?.choices[0].text;
  };

  const onClickHandlerGenerateMessage = async () => {
    await setClassSettings({
      class_year: year,
      last_donation: lastDonation,
      annual_campus_milestones: news.split(",") || "none",
      ask_amount: askAmount,
      donation_deadline: deadline,
    });

    console.log(classSettings);
    console.log(year, lastDonation);

    try {
      setEmptyEditor(false);
      setLoading(true);
      const result = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(classSettings),
      });

      setGeneratedMessage(await result.json());
      setLoading(false);
    } catch (e) {
      setError(error);
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="settings">
        <h3>By Class</h3>
        <SettingInputField
          label="Class Year"
          stateVariable={year}
          onChange={(event) => setYear(event.target.value)}
          type="number"
        />
        <SettingInputField
          label="Previous Year's Amount"
          stateVariable={lastDonation}
          onChange={(event) => setlLastDonation(event.target.value)}
          type="number"
          contentBefore="$"
        />
        <SettingInputField
          label="Important Announcements"
          stateVariable={news}
          onChange={(event) => setNews(event.target.value)}
        />
        <SettingInputField
          label="Asking Amount"
          stateVariable={askAmount}
          onChange={(event) => setAskAmount(event.target.value)}
          type="number"
          contentBefore="$"
        />
        <SettingInputField
          label="Deadline"
          stateVariable={deadline}
          onChange={(event) => setDeadline(event.target.value)}
          type="date"
        />
        <div className="generate-button">
          <Button
            appearance="primary"
            size="medium"
            onClick={onClickHandlerGenerateMessage}
          >
            Generate
          </Button>
        </div>
      </div>

      <div className="editor">
        <h3>Editor</h3>
        {displayGeneratedMessage()}
      </div>
    </div>
  );
};

export default Class;
