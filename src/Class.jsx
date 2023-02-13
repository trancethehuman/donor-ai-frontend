import "./Class.css";
import React, { useState, useRef, useEffect } from "react";
import { Endpoints, CreativityLevels, MessageLengths } from "./consts";
import { Button } from "@fluentui/react-components";
import SettingInputField from "./SettingInputField";
import SettingDropdown from "./SettingDropdown";
import { useNavigate } from "react-router-dom";
import LeftSideBar from "./LeftSideBar";
import MenuNavButton from "./MenuNavButton";

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

  const navigate = useNavigate();

  const editor = useRef();

  const onClickHandlerGenerateMessage = async () => {
    const requestBody = {
      class_year: year || 2023,
      last_donation: lastDonation || 0,
      annual_campus_milestones: news
        ? news.split(",")
        : ["skip this part. no new events"],
      ask_amount: askAmount || 0,
      donation_deadline: deadline || new Date().toISOString().split("T")[0],
      length: length || MessageLengths[0].value,
      creativity: creativity || CreativityLevels[0].value,
    };

    try {
      setEmptyEditor(false);
      setLoading(true);
      const result = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
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
        return `Welcome to Denison's AI-Assisted Fundraising Ghostwriter!\n\nFill out the setting fields on the left, then hit "Generate" to see some magic.\n\n\n\n*Pro tip: you can actually edit this writing area! Go ahead and make edits after the AI gives you results to get the best solicitation letter.`;
      }
      if (loading) {
        return `Beep boop...Generating...\n\n(longer messages could take up to 30 seconds)`;
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
      <h1 className="campaign-header">Class Campaign</h1>
      <LeftSideBar>
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
          placeholder="In USD"
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
          label="Important Announcements"
          stateVariable={news}
          onChange={(event) => setNews(event.target.value)}
          placeholder="Separate with comma"
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

        <Button
          appearance="primary"
          size="large"
          onClick={onClickHandlerGenerateMessage}
        >
          Generate
        </Button>
        <br></br>
        <br></br>

        <MenuNavButton isBackButton />

        <MenuNavButton
          label="Return to Home"
          route="/"
          appearance="secondary"
        />
      </LeftSideBar>
      <div className="editor-area">
        <textarea
          rows="25"
          cols="42"
          ref={editor}
          className="editor"
        ></textarea>
      </div>
    </div>
  );
};

export default Class;
