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
import { Button } from "@fluentui/react-components";
import {
  getTagKeysFromString,
  getTagKeysAndChosenColumnHeaders,
  updateDataWithGeneratedContent,
  replaceTagNamesWithRowData,
} from "../../mergeTagUtils";
import { AllTagReferences, sampleDataChosenColumnHeaders } from "../../consts";
import DataGridWrapper from "../../DataGridWrapper";
import mailchimpDiagram from "../../images/mailchimp-diagram.png";
import { keepCertainKeysForEachObjectOfArray } from "../../utils";
import CardWrapper from "../../CardWrapper";

const Demo = () => {
  const [spreadsheetOneData, setSpreadsheetOneData] = useState();
  const [spreadsheetTwoData, setSpreadsheetTwoData] = useState();
  const [isOptionChosen, setIsOptionChosen] = useState(false);

  const firstEditor = useRef();
  const secondEditor = useRef();

  const handleDemoOptionClick = (option) => {
    if (secondEditor.current) {
      switch (option) {
        case "opener":
          secondEditor.current.value = SampleBaseLetterSmartOpener;
          setIsOptionChosen(true);
          break;
        case "subject_line":
          secondEditor.current.value = SampleBaseLetterSmartSubjectLine;
          setIsOptionChosen(true);
          break;
        default:
          secondEditor.current.value = SampleBaseLetterSmartOpener;
      }
    }
  };

  const handleGenerateButtonClick = async (inputText) => {
    if (inputText) {
      const tagKeys = getTagKeysFromString(inputText, AllTagReferences);
      const tagKeysAndColumns = getTagKeysAndChosenColumnHeaders(
        tagKeys,
        sampleDataChosenColumnHeaders,
        AllTagReferences
      );
      const newData = await updateDataWithGeneratedContent(
        spreadsheetOneData,
        tagKeysAndColumns,
        setSpreadsheetTwoData
      ); //ToDo: there's a new hook called useGenerateAiContent() for this

      // Only keeping the name, city and AI content columns to show cleaner display results
      const filteredDownNewData = keepCertainKeysForEachObjectOfArray(newData, [
        ...tagKeys,
        "name",
        "city",
      ]);

      const content = replaceTagNamesWithRowData(
        secondEditor.current.value,
        AllTagReferences,
        newData[0],
        "*|",
        "|*"
      );

      secondEditor.current.value = content;

      setSpreadsheetTwoData(filteredDownNewData);
    }
  };

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
          You&apos;re an e-commerce jewelry store
          <br />
          named Whimsy Wears 💎
        </p>
        <br />
        <br />
        <br />
        <br />
        <p className="landing-home-subtitle">
          You want to promote a new product to 5 existing customers
        </p>
        <br />
        <br />
        <br />
        <br />
        <br />
        <div className="demo-page-data-grid-area landing-demo-center">
          <DataGridWrapper
            data={SampleCustomerContacts}
            editable
            getCurrentDataCallback={(data) => setSpreadsheetOneData(data)}
            height="18rem"
            fitAllColumnsIntoViewOnLoad
          />
        </div>
        <p className="landing-home-text">Feel free to edit this table!</p>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <p className="landing-home-subtitle">
          You also have an email written
          <br />
          with *| merge tags |*.
        </p>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <div className="landing-demo-center">
          <textarea
            rows="15"
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
          These files both go into MailChimp or other email services.
        </p>
        <br />
        <br />
        <br />
        <div className="landing-demo-center">
          <img
            className="landing-demo-ms-icon"
            src={mailchimpDiagram}
            width="280"
          />
        </div>
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
            rows="18"
            cols="60"
            className="landing-demo-editor"
            ref={secondEditor}
            placeholder="Pick an option from above to see smart Merge Tags added to the base email."
          />
        </div>
        <br />
        <br />
        {isOptionChosen && (
          <div>
            <p className="landing-home-subtitle">
              Now click this button to see the magic happen!
            </p>
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
          </div>
        )}
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <div className="landing-demo-center">
          {spreadsheetTwoData &&
            spreadsheetTwoData.map((row, index) => (
              <CardWrapper
                key={index}
                title={row.name}
                bodyText={row.subject_last_purchase || row.body_location_opener}
              />
            ))}
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
          {spreadsheetTwoData && (
            <DataGridWrapper
              data={spreadsheetTwoData}
              editable
              height="18rem"
              fitAllColumnsIntoViewOnLoad
            />
          )}
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
