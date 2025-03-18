"use client";
import Image from "next/image";
import React, { useContext } from "react";
import { redirect, useRouter } from "next/navigation";
import { UserContext } from "@/context/userContext";
import { handleUserGoogleSignOut } from "@/services/authProvider";

interface propsDataType {
  productLoading: boolean;
}

const HomeNav: React.FC<propsDataType> = ({ productLoading }) => {
  const {
    user,
    setUser,
    setNotificationWindowOpen,
    notifications,
    unReadNotifications,
    setUnReadNotifications,
  } = useContext(UserContext);

  const router = useRouter();

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
        <div className="flex align-start cursor-pointer">
          <Image src={"/food-analysis.png"} width={45} height={45} alt="logo" />
          <p className="text-sm font-head font-medium">Health quality</p>
        </div>
        <p
          className="hidden sm:block font-head text-lg pb-[1px] border-b border-black border-dotted border-b-[2px] cursor-pointer hover:pb-[5px] transition-all duration-200 ease-in-out"
          onClick={() => router.push("/expiry-alert/home")}
        >
          Expiry alert
        </p>
        <div className="font-head flex items-center gap-[15px]">
          {user && user.continueWith === "google" ? (
            <button
              className="bg-gradient-to-r from-yellow-500 to-red-500 pt-[5px] pb-[5px] pl-[25px] pr-[25px] sm:text-[14px] lg:text-[17px] font-medium rounded-md border hover:border-black transition-all duration-300 ease-in-out"
              onClick={async () => await handleUserGoogleSignOut()}
            >
              Sign Out
            </button>
          ) : (
            <button
              className="bg-gradient-to-r from-yellow-500 to-red-500 pt-[5px] pb-[5px] pl-[25px] pr-[25px] sm:text-[14px] lg:text-[17px] font-medium rounded-md border hover:border-black transition-all duration-300 ease-in-out"
              onClick={handleUserSignOut}
            >
              Sign Out
            </button>
          )}
          {!productLoading ? (
            <div
              className="relative cursor-pointer z-auto"
              onClick={() => setNotificationWindowOpen(true)}
            >
              <Image
                src={"/bell.png"}
                alt=""
                height={20}
                width={20}
                className="sm:h-[25px] sm:w-[25px]"
              />
              {unReadNotifications.length > 0 && (
                <div className="absolute h-[14px] w-[14px] sm:h-[17px] sm:w-[17px] bg-red-500 rounded-full inset-y-[-6px] inset-x-[14px] flex items-center justify-center text-[10px] sm:text-[12px] text-orange-50 font-bold">
                  {unReadNotifications.length < 99
                    ? unReadNotifications.length
                    : "99+"}
                </div>
              )}
            </div>
          ) : (
            <div className="h-[20px] w-[20px] sm:h-[25px] sm:w-[25px] bg-orange-200 rounded-full loading-animation"></div>
          )}
        </div>
      </div>
      <hr className="h-[1px] w-full bg-gray-500 border-none" />
      <div className="flex items-center justify-center font-head text-lg">
        <div
          className="block sm:hidden border border-black rounded-md pl-[15px] pr-[15px] pt-[2px] pb-[2px] border-t-0 rounded-tl-none rounded-tr-none cursor-pointer transition-all duration-300 ease-in-out hover:bg-yellow-500"
          onClick={() => router.push("/expiry-alert/home")}
        >
          Expiry alert
        </div>
      </div>
    </div>
  );
};

export default HomeNav;
