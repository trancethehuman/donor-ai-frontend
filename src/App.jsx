import "./App.css";
import Class from "./Class";
import IndividualCampaign from "./IndividualCampaign";
import Home from "./Home";
import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "individual-campaign",
    element: <IndividualCampaign />,
  },
  {
    path: "class-campaign",
    element: <Class />,
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
