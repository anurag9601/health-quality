"use client";
import AuthNav from "@/components/AuthNav/AuthNav";
import React, { FormEvent } from "react";
import { CiCircleCheck } from "react-icons/ci";
import { FaLongArrowAltRight } from "react-icons/fa";

const page = () => {
  const [emailSent, setEmailSent] = React.useState<boolean>(false);

  const handleSendUserPasswordResetEmail = (e: FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="h-full w-full bg-orange-50 flex flex-col">
      <AuthNav />
      <div className="flex flex-1 items-center justify-center">
        <form
          onSubmit={handleSendUserPasswordResetEmail}
          className="flex flex-col items-center max-w-[350px] w-full pl-[20px] pr-[20px]"
        >
          <h3 className="font-head text-xl">Reset password</h3>
          <p className="font-head text-md mb-[10px]">
            We'll email you a password reset link.
          </p>
          <input
            type="text"
            className="w-full h-[40px] rounded-md bg-amber-100 border-[1.5px] border-amber-700 outline-none font-normal pl-[15px] pr-[15px] text-md font-medium mb-[10px]"
          />
          {!emailSent ? (
            <button
              className="flex items-center justify-center gap-[10px] w-full font-head mt-[6px] text-xl h-[40px] bg-rose-400 rounded-md hover:bg-rose-300"
              type="button"
            >
              Start password reset <FaLongArrowAltRight />
            </button>
          ) : (
            <button
              className="flex items-center justify-center gap-[10px] w-full font-head mt-[6px] text-xl h-[40px] bg-green-700 rounded-md text-emerald-50 cursor-not-allowed"
              type="button"
            >
              Email sent <CiCircleCheck className="text-lg" />
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default page;
