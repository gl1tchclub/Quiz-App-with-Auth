import React, { useState } from "react";
import { ReloadIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";

const LoadingButton = ({ isLoading, onClick, children }) => {
  return (
    <Button onClick={onClick} disabled={isLoading}>
      {isLoading ? (
        <Button disabled>
          <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
          Please wait
        </Button>
      ) : (
        children
      )}
    </Button>
  );
};

export default LoadingButton;
