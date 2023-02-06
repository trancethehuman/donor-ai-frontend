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
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
      {/* <IndividualCampaign />
      <Class /> */}
    </div>
  );
}

export default App;
