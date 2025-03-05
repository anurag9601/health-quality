"use client";
import Image from "next/image";
import { redirect } from "next/navigation";
import React from "react";

const NotFound = () => {
  return (
    <div className="h-full w-full bg-orange-50 flex flex-col items-center justify-center pl-[20px] pr-[20px]">
      <Image src={"/notfound.png"} alt="" height={60} width={60} className="sm:h-[80px] sm:w-[80px]"/>
      <p className="text-md sm:text-xl mt-[10px] font-head text-orange-500 text-center">This page is currently under development. Please check back later.</p>
      <p className="font-head text-sm mt-[5px]">
        In the meantime, you can visit our <span className="ml-[10px] text-orange-400 text-lg cursor-pointer hover:text-orange-600" onClick={() => redirect("/")}>homepage</span>
      </p>
    </div>
  );
};

export default NotFound;
