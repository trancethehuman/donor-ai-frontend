import Ghostwriter from "./Ghostwriter";
import Help from "./Help";
import LandingHome from "./LandingPage/LandingHome";
import Demo from "./LandingPage/InteractiveDemo/Demo";
import Class from "./Class";
import IndividualCampaign from "./IndividualCampaign";
import MergeFields from "./MergeFields";
import About from "./LandingPage/About";
import Pricing from "./LandingPage/Pricing";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingHome />,
  },
  {
    path: "/pricing",
    element: <Pricing />,
  },
  {
    path: "/About",
    element: <About />,
  },
  {
    path: "demo",
    element: <Demo />,
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

export default router;
