"use client"
import { UserContext } from "@/context/userContext";
import { useParams } from "next/navigation";
import React, { useContext } from "react";

const NewPassword = () => {
  const { id } = useParams();

  const { resetPasswordId } = useContext(UserContext);

  return (
    <div>
      stored resetPasswordId: {resetPasswordId}
      url passedId: {id}
    </div>
  );
};

export default NewPassword;
