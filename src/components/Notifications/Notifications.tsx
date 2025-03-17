"use client";
import { UserContext } from "@/context/userContext";
import React, { useContext, useState } from "react";
import { FaCompressArrowsAlt } from "react-icons/fa";
import { GoAlertFill } from "react-icons/go";
import { BiSolidNotification } from "react-icons/bi";
import Image from "next/image";
import { MdDelete } from "react-icons/md";
import moment from "moment";

const Notifications = () => {
  const { setNotificationWindowOpen, notifications, setNotifications } =
    useContext(UserContext);

  const [deleteNotificationId, setDeleteNotificationId] = React.useState<
    string | null
  >(null);

  const [noNotifications, setNoNotifications] = React.useState<boolean>(false);

  const handleUserDeleteNotification = async () => {
    if (!deleteNotificationId) return;

    const request = await fetch("/api/notification/delete", {
      method: "POST",
      body: JSON.stringify({
        deleteNotificationId: deleteNotificationId,
      }),
    });

    const response = await request.json();

    if (response.success === true) {
      const filterNotificationList = notifications.filter(
        (notification) => notification._id !== response.deletedNotification._id
      );
      if (filterNotificationList.length == 0) {
        setNotifications([]);
      }
      setNotifications(filterNotificationList);
    }

    setDeleteNotificationId(null);
  };

  React.useEffect(() => {
    handleUserDeleteNotification();

    if (notifications.length == 0) {
      setNoNotifications(true);
    }
  }, [deleteNotificationId]);

  return (
    <div className="h-full w-full bg-neutral-600 bg-opacity-50 fixed flex items-center justify-center font-head z-[1] pt-[10px] pb-[10px] pl-[5px] pr-[5px]">
      <div className="h-full max-w-[400px] w-full bg-orange-50 rounded-lg pl-[10px] pr-[10px] pt-[5px] pb-[5px] flex flex-col">
        <div className="flex items-center justify-between">
          <span className="text-lg flex items-center gap-[5px]">
            Notifications <GoAlertFill className="text-md text-orange-500" />
          </span>
          <FaCompressArrowsAlt
            className={`text-sm text-orange-400 ${
              !deleteNotificationId && "hover:text-orange-600"
            } ${deleteNotificationId && "opacity-[50%]"} ${
              !deleteNotificationId && "cursor-pointer"
            }`}
            onClick={() => {
              if (!deleteNotificationId) {
                setNotificationWindowOpen(false);
              }
            }}
          />
        </div>
        {noNotifications ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-[20px] pl-[10%] pr-[10%] text-center text-lg">
            You&apos;re all set! Notifications will appear when you analyze or
            set expiry
            <BiSolidNotification className="text-[30px] text-orange-500" />
          </div>
        ) : (
          <div className="flex flex-col w-full h-full gap-[5px] mt-[10px] mb-[10px]">
            {notifications.map((notification, index) => (
              <div
                className="h-fit w-full bg-orange-200 rounded-md flex items-center relative"
                key={index}
              >
                {notification.notificationType === "analysis" && (
                  <Image
                    src="/analysis.png"
                    alt=""
                    height={12}
                    width={12}
                    className="absolute inset-y-[-3px] inset-x-[-1px]"
                  />
                )}
                <div className="flex-1 h-fit">
                  <p className="text-[14px] sm:text-[15px] mt-[10px] pl-[10px] pr-[10px] h-fit mb-[5px]">
                    {notification.notificationMessage}
                  </p>
                  <div className="w-full flex items-end justify-between">
                    <span className="text-[12px] sm:text-[13px] float-right font-head font-semibold pb-[5px] pl-[10px] text-orange-700">
                      {moment(notification.createdAt).format("h:mm A")}
                    </span>
                    {deleteNotificationId === notification._id ? (
                      <div className="pl-[5px] pr-[5px] pt-[5px] pb-[5px]">
                        <div className="h-[20px] w-[20px] rounded-full border border-[3px] border-t-orange-500 border-t-[3px] spin-animation"></div>
                      </div>
                    ) : (
                      <MdDelete
                        className={`flex-1 h-full max-w-fit pl-[5px] pr-[5px] pt-[5px] pb-[5px] text-red-500 text-[20px] ${
                          !deleteNotificationId &&
                          "hover:bg-red-500 hover:text-orange-50 cursor-pointer"
                        } rounded-md transition-all delay-[300] ease-in-out ${
                          deleteNotificationId && "opacity-[50%]"
                        } `}
                        onClick={() => {
                          if (!deleteNotificationId) {
                            setDeleteNotificationId(notification._id);
                          }
                        }}
                      />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Notifications;
