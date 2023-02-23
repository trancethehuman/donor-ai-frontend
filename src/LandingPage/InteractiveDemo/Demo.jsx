import NavBar from "../NavBar";
import "../LandingHome.css"; // This component actually uses CSS from the LandingHome.css
import "./Demo.css";
import { useRef, useEffect, useState } from "react";
import thinkingEmoji from "../../images/thinking_emoji.png";
import {
  SampleBaseLetter,
  SampleCustomerContacts,
  SampleBaseLetterSmartOpener,
  SampleBaseLetterSmartSubjectLine,
} from "../../consts";
import "./Demo.css";
import { useSpreadsheetData } from "../../spreadsheetHooks";
import { Button } from "@fluentui/react-components";
import { getTags } from "../../mergeTagUtils";
import { AllMergeTags } from "../../consts";
import DataGridWrapper from "../../DataGridWrapper";

const Demo = () => {
  const [spreadsheetData, setSpreadsheetData] = useState();
  const firstEditor = useRef();
  const secondEditor = useRef();
  const header = useRef();
  const data = useSpreadsheetData(SampleCustomerContacts, true);

  const handleSpeadsheetData = (data) => {
    setSpreadsheetData(data);
  };

  const handleDemoOptionClick = (option) => {
    if (secondEditor.current) {
      switch (option) {
        case "opener":
          secondEditor.current.value = SampleBaseLetterSmartOpener;
          break;
        case "subject_line":
          secondEditor.current.value = SampleBaseLetterSmartSubjectLine;
          break;
        default:
          secondEditor.current.value = SampleBaseLetterSmartOpener;
      }
    }
  };

  const handleGenerateButtonClick = (inputText) => {
    if (inputText) {
      getTags(inputText, AllMergeTags);
    }
  };

  useEffect(() => {
    console.log(spreadsheetData);
  }, [spreadsheetData]);

  useEffect(() => {
    firstEditor.current.value = SampleBaseLetter;
  }, []);

  return (
    <div>
      <NavBar />
      <div className="landing-home-center-content-area">
        <p className="landing-home-tagline">Interactive Demo</p>
        <br />
        <br />
        <p className="landing-home-subtitle">
          You&apos;re an e-commerce jewelry shop
          <br />
          called Whimsy Wears 💎
        </p>
        <br />
        <br />
        <br />
        <br />
        <p className="landing-home-subtitle">
          You have 10 customers and you want to send each
          <br />
          an email about a new product
        </p>
        <br />
        <br />
        <br />
        <br />
        <br />
        <div className="demo-page-data-grid-area landing-demo-center">
          <DataGridWrapper data={SampleCustomerContacts} editable />
        </div>
        <p className="landing-home-text">Feel free to modify this table!</p>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <p className="landing-home-subtitle">
          You also have a template email written.
        </p>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <div className="landing-demo-center">
          <textarea
            rows="25"
            cols="60"
            className="landing-demo-editor"
            ref={firstEditor}
          />
        </div>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <p className="landing-home-subtitle">
          These two files both go into MailChimp or some other services.
          <br />
          This is what most businesses do.
        </p>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <p className="landing-home-subtitle">
          But what if you can maximize your customer&apos;s data
          <br />
          and write the best email possible?
        </p>
        <br />
        <br />
        <br />
        <div className="landing-demo-center">
          <img src={thinkingEmoji} width="70" />
        </div>
        <br />
        <br />
        <br />
        <br />
        <br />
        <p className="landing-home-subtitle">Pick one of these options:</p>
        <div className="landing-demo-center">
          <div className="landing-demo-smart-option">
            <Button
              size="large"
              onClick={() => handleDemoOptionClick("opener")}
            >
              Clever Opener
            </Button>
          </div>
          <div className="landing-demo-smart-option">
            <Button
              size="large"
              onClick={() => handleDemoOptionClick("subject_line")}
            >
              Smart Subject Line
            </Button>
          </div>
        </div>
        <br />
        <div className="landing-demo-center">
          <textarea
            rows="25"
            cols="60"
            className="landing-demo-editor"
            ref={secondEditor}
            placeholder="Pick an option from above to see smart Merge Tags added to the base email."
          />
        </div>
        <br />
        <br />
        <div className="landing-demo-center">
          <Button
            size="large"
            appearance="primary"
            onClick={() =>
              handleGenerateButtonClick(secondEditor.current.value)
            }
          >
            Generate AI Content!
          </Button>
        </div>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <div className="demo-page-data-grid-area landing-demo-center">
          <DataGridWrapper data={SampleCustomerContacts} editable />
        </div>
        <br />
        <br />
        <br />
        <br />
      </div>
    </div>
  );
};

export default Demo;
