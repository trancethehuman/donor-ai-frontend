import "./App.css";
import Class from "./Class";
import IndividualCampaign from "./IndividualCampaign";
import Home from "./Home";
import React from "react";
import MergeFields from "./MergeFields";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Ghostwriter from "./Ghostwriter";
import Help from "./Help";
import LandingHome from "./LandingPage/LandingHome";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingHome />,
  },
  {
    path: "ghostwriter",
    element: <Ghostwriter />,
  },
  {
    path: "individual-campaign",
    element: <IndividualCampaign />,
  },
  {
    path: "help",
    element: <Help />,
  },
  {
    path: "class-campaign",
    element: <Class />,
  },
  {
    path: "merge-fields",
    element: <MergeFields />,
  },
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
