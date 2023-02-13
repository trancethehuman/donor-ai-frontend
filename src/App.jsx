import "./App.css";
import Class from "./Class";
import IndividualCampaign from "./IndividualCampaign";
import Home from "./Home";
import React from "react";
import MergeFields from "./MergeFields";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Ghostwriter from "./Ghostwriter";
import Help from "./Help";
import About from "./About";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
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
    path: "about",
    element: <About />,
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
