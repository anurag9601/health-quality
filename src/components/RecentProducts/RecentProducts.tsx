import Image from "next/image";
import React from "react";
import { FaCircleCheck } from "react-icons/fa6";

const RecentProducts = () => {
  return (
    <div className="pl-[10%] pr-[10%]">
      <div className="flex items-start gap-[10px]">
        <h4 className="font-head sm:text-sm md:text-lg">Recent add products</h4>{" "}
        <Image src="/healthy-food.png" alt="" width={40} height={40} />
      </div>
      <hr className="h-[1px] w-full bg-gray-500 border-none mt-[10px]" />
      <div className="h-full w-full">
        <div className="h-full w-full flex items-center justify-between pl-[3%] pr-[3%] pt-[10px] pb-[10px] hover:bg-orange-200 cursor-pointer transition-all duration-200 ease-in-out">
          <div className="w-fit flex items-center gap-[10px] md:gap-[20px]">
            <FaCircleCheck className="text-xl md:text-2xl text-lime-600" />
            <p className="font-head text-lg">Product name</p>
          </div>
          <div className="hidden sm:hidden md:flex items-center gap-[40px] font-head">
            <p>
              <span className="text-teal-600 font-semibold">Healthy:</span> 30%
            </p>
            <p>
              <span className="text-red-600 font-semibold">Unhealthy:</span> 70%
            </p>
          </div>
          <Image
            src={"/delete.png"}
            alt=""
            height={30}
            width={30}
            className="cursor-pointer h-[25px] w-[25px] md:h-[30px] md:w-[30px]"
          />
        </div>
        <hr className="h-[1px] w-full bg-gray-500 border-none" />
      </div>
    </div>
  );
};

export default RecentProducts;
