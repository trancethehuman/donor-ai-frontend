import "./Class.css";
import React, { useState, useRef, useEffect } from "react";
import { Endpoints, CreativityLevels, MessageLengths } from "./consts";
import { Button } from "@fluentui/react-components";
import SettingInputField from "./SettingInputField";
import SettingDropdown from "./SettingDropdown";
import LeftSidebar from "./LeftSidebar";
import MenuNavButton from "./MenuNavButton";

const { CLASS: endpoint } = Endpoints;

const Class = () => {
  const [generatedMessage, setGeneratedMessage] = useState();
  const [isEditorEmpty, setIsEditorEmpty] = useState(true);
  const [loading, setLoading] = useState();
  const [error, setError] = useState();

  const [year, setYear] = useState();
  const [lastDonation, setlLastDonation] = useState();
  const [askAmount, setAskAmount] = useState();
  const [news, setNews] = useState();
  const [deadline, setDeadline] = useState();
  const [creativity, setCreativity] = useState();
  const [length, setLength] = useState();

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
      setIsEditorEmpty(false);
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
      if (isEditorEmpty) {
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
  }, [isEditorEmpty, error, generatedMessage, loading]);

  return (
    <div className="container">
      <LeftSidebar>
        <h1>Class Campaign</h1>
        <br />
        <MenuNavButton
          label="Return to Home"
          route="/"
          appearance="secondary"
        />
        <MenuNavButton isBackButton />

        <h2>General Settings</h2>
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
      </LeftSidebar>
      <div className="editor-area">
        <textarea rows="25" cols="42" ref={editor} className="editor" />
      </div>
    </div>
  );
};

export default Class;
