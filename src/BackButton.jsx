import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@fluentui/react-components";

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <Button size="large" appearance="primary" onClick={() => navigate(-1)}>
      Back
    </Button>
  );
};

export default BackButton;
