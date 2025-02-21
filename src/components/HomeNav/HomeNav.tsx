import Image from "next/image";
import React from "react";

const HomeNav = () => {
  return (
    <div className="w-full">
      <div className="w-full pl-[10%] pr-[10%] pt-[5px] pb-[5px] flex items-center justify-between">
        <div className="flex align-start cursor-pointer">
          <Image src={"/food-analysis.png"} width={45} height={45} alt="logo" />
          <p className="text-sm font-head font-medium">Health quality</p>
        </div>
        <p className="hidden sm:block font-head text-lg pb-[1px] border-b border-black border-dotted border-b-[2px] cursor-pointer hover:pb-[5px] transition-all duration-200 ease-in-out">
          Expiry alert
        </p>
        <div className="font-head flex items-center gap-[15px]">
          <button className="bg-gradient-to-r from-yellow-500 to-red-500 pt-[5px] pb-[5px] pl-[25px] pr-[25px] sm:text-[14px] lg:text-[17px] font-medium rounded-md border hover:border-black transition-all duration-300 ease-in-out">
            Sign Out
          </button>
        </div>
      </div>
      <hr className="h-[1px] w-full bg-gray-500 border-none" />
      <div className="flex items-center justify-center font-head text-lg">
        <div className="block sm:hidden border border-black rounded-md pl-[15px] pr-[15px] pt-[2px] pb-[2px] border-t-0 rounded-tl-none rounded-tr-none cursor-pointer transition-all duration-300 ease-in-out hover:bg-yellow-500">
          Expiry alert
        </div>
      </div>
    </div>
  );
};

export default HomeNav;
