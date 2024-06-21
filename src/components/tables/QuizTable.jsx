import { useState } from "react";
import { queryClient } from "../../main";

// Components
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ErrorAlert } from "../Alert";
import CardWrapper from "../CardWrapper";
import UpdateDialog from "../UpdateDialog";

const QuizTable = () => {
  const user = JSON.parse(localStorage.getItem("userData"));

  if (!user) {
    return <ErrorAlert desc="Unauthorized. Please log in" />;
  }

  const participate = () => {

  }

  return (
    <></>
  );
};

export default QuizTable;