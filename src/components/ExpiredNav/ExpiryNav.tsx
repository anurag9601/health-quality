"use client";
import { UserContext } from "@/context/userContext";
import { handleUserGoogleSignOut } from "@/services/authProvider";
import Image from "next/image";
import { redirect, useRouter } from "next/navigation";
import React, { useContext } from "react";

const ExpiryNav = () => {
  const {
    user,
    setUser,
    setNotificationWindowOpen,
    notifications,
    setUnReadNotifications,
    unReadNotifications,
  } = useContext(UserContext);

  const handleUserSignOut = async () => {
    const request = await fetch("/api/signout");

    const response = await request.json();

    if (response.success === true) {
      setUser(null);
      redirect("/signin");
    }
  };

  React.useEffect(() => {
    if (notifications.length > 0) {
      let allUnReadNotifications = notifications.filter(
        (notification) => notification.read === false
      );

      setUnReadNotifications(allUnReadNotifications);
    }
  }, [notifications]);
  return (
    <div className="w-full">
      <div className="w-full pl-[10%] pr-[10%] pt-[5px] pb-[5px] flex items-center justify-between">
        <div className="flex justify-center items-start gap-[5px]">
          <Image src={"/expired-logo.png"} width={45} height={45} alt="logo" />
          <p className="font-head text-[12px]  text-sky-50 bg-indigo-400 pl-[5px] pr-[5px] rounded-sm font-semibold">
            Expiry alert
          </p>
        </div>
        <div className="font-head flex items-center gap-[15px]">
          {user && user.continueWith === "google" ? (
            <button
              className="bg-gradient-to-r from-blue-300 to-indigo-500 pt-[5px] pb-[5px] pl-[25px] pr-[25px] sm:text-[14px] lg:text-[17px] font-medium rounded-md border hover:border-black transition-all duration-300 ease-in-out"
              onClick={async () => await handleUserGoogleSignOut()}
            >
              Sign Out
            </button>
          ) : (
            <button
              className="bg-gradient-to-r from-blue-300 to-indigo-500 pt-[5px] pb-[5px] pl-[25px] pr-[25px] sm:text-[14px] lg:text-[17px] font-medium rounded-md border hover:border-black transition-all duration-300 ease-in-out"
              onClick={handleUserSignOut}
            >
              Sign Out
            </button>
          )}
          <div
            className="relative cursor-pointer z-auto"
            onClick={() => setNotificationWindowOpen(true)}
          >
            <Image
              src={"/expiry-bell.png"}
              alt=""
              height={20}
              width={20}
              className="sm:h-[25px] sm:w-[25px]"
            />
            {unReadNotifications.length > 0 && (
              <div className="absolute h-[14px] w-[14px] sm:h-[17px] sm:w-[17px] bg-indigo-500 rounded-full inset-y-[-6px] inset-x-[14px] flex items-center justify-center text-[10px] sm:text-[12px] text-blue-50 font-bold">
                {unReadNotifications.length < 99
                  ? unReadNotifications.length
                  : "99+"}
              </div>
            )}
          </div>
        </div>
      </div>
      <hr className="h-[1px] w-full bg-gray-500 border-none" />
    </div>
  );
};

export default ExpiryNav;
