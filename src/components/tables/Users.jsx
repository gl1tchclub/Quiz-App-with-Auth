// src/components/UserTable.jsx
import React from "react";
import { useQuery, useInfiniteQuery } from "@tanstack/react-query";

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
import Loading from "../Load";
import { ErrorAlert } from "../Alert";
import CardWrapper from "../CardWrapper";
import { useForm } from "react-hook-form";

const AllUsersTable = () => {
  const updateForm = useForm();
  

  const { isLoading, data: users } = useQuery({
    queryKey: ["users"],
    queryFn: () =>
      fetch("https://two4-mintep1-app-dev.onrender.com/api/v1/users/all", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }).then((res) => res.json()),
  });
};



export default AllUsersTable;
