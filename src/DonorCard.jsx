import { Button } from "@fluentui/react-components";
import { useRef, useState, useEffect } from "react";
import { MessageLengths, CreativityLevels, Endpoints } from "./consts";
import "./DonorCard.css";

const { INDIVIDUAL_DONOR: endpoint } = Endpoints;

const DonorCard = ({ donorData, messageSettings }) => {
  const [generatedMessage, setGeneratedMessage] = useState(null);
  const [emptyEditor, setEmptyEditor] = useState(true);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);
  const editor = useRef();

  const onClickHandlerGenerateMessage = async () => {
    const requestBody = {
      name: donorData.name,
      majors: [donorData.major],
      internships: donorData.internships.split(",") || ["no internships"],
      hometown: donorData.city,
      clubs: donorData.extracurriculars.split(",") || ["no clubs"],
      current_job: donorData.job,
      class_year: donorData.year,
      last_donation: donorData.donation || 0,
      annual_campus_milestones:
        typeof messageSettings?.annual_campus_milestones === String
          ? messageSettings?.annual_campus_milestones.split(",")
          : ["skip this part. no new events"],
      ask_amount: donorData.donation * (125 / 100) || 0,
      donation_deadline:
        messageSettings?.donation_deadline ||
        new Date().toISOString().split("T")[0],
      length: messageSettings?.length || MessageLengths[0].value,
      creativity: messageSettings?.creativity || CreativityLevels[1].value,
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
        return `Empty. Hit Generate!`;
      }

      if (loading) {
        return `Beep boop...Generating...\n\n(longer messages could take up to 30 seconds)`;
      }

      if (error) {
        return `Error: {error.message}`;
      }

      if (generatedMessage) {
        return generatedMessage?.choices[0].text;
      }
    };

    editor.current.value = displayGeneratedMessage();
  }, [emptyEditor, error, generatedMessage, loading]);

  return (
    <div className="card">
      <h2>{donorData.name}</h2>
      <div className="sub-title-area">
        <span className="sub-title">'{donorData.year}</span>
        <span className="sub-title">{donorData.major} major</span>
        <span className="sub-title">{donorData.city}</span>
        <span className="sub-title">{donorData.job}</span>
      </div>
      <div className="sub-title-area">
        <span className="sub-title">past donation: {donorData.donation}</span>
        <span className="sub-title">
          activities: {donorData.extracurriculars}
        </span>
        <span className="sub-title">internships: {donorData.internships}</span>
      </div>
      <textarea rows="8" cols="48" ref={editor} className="editor"></textarea>
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
  );
};

export default DonorCard;
