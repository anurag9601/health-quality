import Image from "next/image";
import React from "react";

const HomeNav = () => {
  return (
    <div className="w-full">
      <div className="w-full pl-[10%] pr-[10%] pt-[5px] pb-[5px]">
        <div className="flex align-start">
          <Image src={"/food-analysis.png"} width={45} height={45} alt="logo" />
          <p className="text-sm font-head font-medium">Health quality</p>
        </div>
      </div>
      <hr className="h-[1px] w-full bg-gray-500 border-none" />
    </div>
  );
};

export default HomeNav;
