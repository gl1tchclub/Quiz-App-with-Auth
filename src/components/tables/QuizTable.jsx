import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { queryClient } from "../../main";
import { useMutation } from "@tanstack/react-query";

// Components
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { TrashIcon } from "@radix-ui/react-icons";

import CardWrapper from "../CardWrapper";
import Loading from "../Load";
import UpdateDialog from "../UpdateDialog";
import { ErrorAlert } from "../Alert";

const AllQuizzesTable = () => {
  const token = localStorage.getItem("token");

  // State for dialog
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [type, setType] = useState(null);

  // Get All Quizzes
  const {
    isLoading,
    data: quizzes,
    error,
    refetch,
  } = useQuery({
    queryKey: ["quizzes"],
    queryFn: () =>
      fetch(`https://two4-mintep1-app-dev.onrender.com/api/v1/quizzes/all/${type}`)
      .then((res) => res.json()),
    onSuccess: (data) => {
      console.log(JSON.parse(data));
    },
  });
};
