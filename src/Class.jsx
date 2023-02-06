import "./Class.css";
import React, { useState, useRef, useEffect } from "react";
import { Endpoints, CreativityLevels, MessageLengths } from "./consts";
import { Button } from "@fluentui/react-components";
import SettingInputField from "./SettingInputField";
import SettingDropdown from "./SettingDropdown";

const { CLASS: endpoint } = Endpoints;

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
  const [creativity, setCreativity] = useState();
  const [length, setLength] = useState();

  const editor = useRef();

  const onClickHandlerGenerateMessage = async () => {
    const classSettings = {
      class_year: year,
      last_donation: lastDonation,
      annual_campus_milestones: news.split(",") || "none",
      ask_amount: askAmount,
      donation_deadline: deadline,
      length: length,
      creativity: creativity,
    };

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

  useEffect(() => {
    const displayGeneratedMessage = () => {
      if (emptyEditor) {
        return `Welcome to Denison's AI Assisted Donation Campaign Message Writer!\n\nFill out the settings panel on the left, then hit "Generate" to see some magic.`;
      }
      if (loading) {
        return `Generating...(this could take a few seconds)`;
      }

      if (error) {
        return `Error: {error.message}`;
      }

      return generatedMessage?.choices[0].text;
    };

    editor.current.value = displayGeneratedMessage();
  }, [emptyEditor, error, generatedMessage, loading]);

  return (
    <div className="container">
      <div className="settings-area">
        <h2>Class Campaign</h2>
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
          placeholder="Campus Events"
        />
        <SettingInputField
          label="Asking Amount"
          stateVariable={askAmount}
          onChange={(event) => setAskAmount(event.target.value)}
          type="number"
          contentBefore="$"
          placeholder="In USD"
        />
        <SettingInputField
          label="Deadline"
          stateVariable={deadline}
          onChange={(event) => setDeadline(event.target.value)}
          type="date"
        />
        <SettingDropdown
          label="Creativity Level"
          options={CreativityLevels}
          stateVariable={creativity}
          onChange={setCreativity}
        />
        <SettingDropdown
          label="Length"
          options={MessageLengths}
          stateVariable={length}
          onChange={setLength}
        />
        <div className="generate-button">
          <Button
            appearance="primary"
            size="large"
            onClick={onClickHandlerGenerateMessage}
          >
            Generate
          </Button>
        </div>
      </div>
      <div className="editor-area">
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <textarea
          rows="20"
          cols="60"
          ref={editor}
          className="editor"
        ></textarea>
      </div>
    </div>
  );
};

export default Class;
