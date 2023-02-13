import DonorCard from "./DonorCard";
import { TestDonorList } from "./consts";
import SettingDropdown from "./SettingDropdown";
import SettingInputField from "./SettingInputField";
import { useState, useEffect } from "react";
import { CreativityLevels } from "./consts";
import { MessageLengths } from "./consts";
import "./IndividualCampaign.css";
import MenuNavButton from "./MenuNavButton";
import { useNavigate } from "react-router-dom";
import LeftSidebar from "./LeftSidebar";

const IndividualCampaign = () => {
  const [news, setNews] = useState();
  const [deadline, setDeadline] = useState();
  const [creativity, setCreativity] = useState();
  const [length, setLength] = useState();
  const [messageSettings, setMessageSettings] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    setMessageSettings({
      annual_campus_milestones: news
        ? news.split(",")
        : ["skip this part. no new events"],
      donation_deadline: deadline || new Date().toISOString().split("T")[0],
      length: length || MessageLengths[0].value,
      creativity: creativity || CreativityLevels[0].value,
    });
  }, [creativity, deadline, length, news]);

  return (
    <div className="container">
      <h1 className="campaign-header">Individual Donors Campaign</h1>
      <LeftSidebar>
        <div className="instructions-area">
          <h2>Instructions</h2>
          <p>Set the general settings of an email down below.</p>
          <p>
            Click "Generate" on each to get a custom email message curated just
            for that donor.
          </p>
        </div>

        <br></br>

        <h2>General Settings</h2>
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
        <br></br>

        <MenuNavButton isBackButton />

        <MenuNavButton
          route="/"
          label="Return to Home"
          appearance="secondary"
        />
      </LeftSidebar>
      <div className="donor-area">
        <h3>Scroll down for more donors ↓ </h3>
        <br></br>
        {TestDonorList.map((donor, index) => (
          <DonorCard
            key={index}
            donorData={donor}
            messageSettings={messageSettings}
          />
        ))}
      </div>
    </div>
  );
};

export default IndividualCampaign;
