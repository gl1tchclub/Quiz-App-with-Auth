import React from "react";

import { Button } from "@/components/ui/button";

const LoadingButton = (props) => {
  return (
    <Button
      onClick={props.onClick}
      disabled={props.isLoading}
      type={props.type}
      className={props.className}
    >
      
    </Button>
  );
};

export default LoadingButton;
