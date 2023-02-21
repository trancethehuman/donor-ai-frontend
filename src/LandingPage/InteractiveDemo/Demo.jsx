import NavBar from "../NavBar";
import "../LandingHome.css"; // This component actually uses CSS from the LandingHome.css
import SpreadsheetViewer from "../../SpreadsheetViewer";
import { useRef, useEffect } from "react";
import thinkingEmoji from "../../images/thinking_emoji.png";
import {
  SampleBaseLetter,
  SampleCustomerContacts,
  TestDonorList,
} from "../../consts";
import "./Demo.css";
import { stox } from "../../spreadsheetUtils";
import { useSpreadsheetData } from "../../spreadsheetHooks";

const Demo = () => {
  const editor = useRef();
  const data = useSpreadsheetData(SampleCustomerContacts, true);

  useEffect(() => {
    editor.current.value = SampleBaseLetter;
  }, []);

  return (
    <div>
      <NavBar />
      <div className="center-content-area">
        <div className="landing-home-tagline-area">
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
          <SpreadsheetViewer
            height="25rem"
            width="45rem"
            options={{
              showToolbar: false,
              col: {
                len: 6,
              },
              row: {
                len: 13,
              },
            }}
            data={data}
          />
          <br />
          <p>Feel free to modify this table to your liking!</p>
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
          <textarea
            rows="25"
            cols="60"
            className="landing-demo-editor"
            ref={editor}
          ></textarea>
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <p className="landing-home-subtitle">
            These two files both go into services like MailChimp,
            <br />
            which sends out generic emails to every single customer.
            <br />
            This is what most businesses do.
          </p>
          <br />
          <br />
          <br />
          <br />
          <p className="landing-home-subtitle">
            But what if you can maximize your customer&apos;s data
            <br />
            and craft the best email possible?
          </p>
          <br />
          <br />
          <br />
          <br />
          <img src={thinkingEmoji} width="70" />
        </div>
        <br />
      </div>
    </div>
  );
};

export default Demo;
