"use client";
import { UserContext } from "@/context/userContext";
import React, { useContext } from "react";
import { FaCompressArrowsAlt } from "react-icons/fa";
import { GoAlertFill } from "react-icons/go";

const ExpiryNotification = () => {
  const { setNotificationWindowOpen } = useContext(UserContext);

  return (
    <div className="h-full w-full bg-neutral-600 bg-opacity-50 fixed flex items-center justify-center font-head z-[1] pt-[10px] pb-[10px] pl-[5px] pr-[5px]">
      <div className="h-full max-w-[400px] w-full bg-sky-100 rounded-lg pl-[10px] pr-[10px] pt-[5px] pb-[5px]">
        <div className="flex items-center justify-between">
          <span className="text-lg flex items-center gap-[5px]">
            Notifications <GoAlertFill className="text-md text-indigo-500" />
          </span>
          <FaCompressArrowsAlt
            className="text-sm text-indigo-400 hover:text-indigo-600 cursor-pointer"
            onClick={() => setNotificationWindowOpen(false)}
          />
        </div>
      </div>
    </div>
  );
};

export default ExpiryNotification;
