"use client";
import AddExpireDetails from "@/components/AddExpireDetails/AddExpireDetails";
import ExpiryNav from "@/components/ExpiredNav/ExpiryNav";
import ExpiryRecentProducts from "@/components/ExpiryRecentProducts/ExpiryRecentProducts";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { FaLongArrowAltLeft } from "react-icons/fa";

const ExpiryHome = () => {
  const router = useRouter();

  const [addManuallyBoxOpen, setAddManuallyBoxOpen] = React.useState(false);

  return (
    <div className="h-full w-full bg-sky-100">
      {addManuallyBoxOpen && (
        <AddExpireDetails setAddManuallyBoxOpen={setAddManuallyBoxOpen} />
      )}
      <ExpiryNav />
      <div className="w-full h-[20px] pl-[10px] pt-[10px] mb-[10px]">
        <span
          className="font-head text-[15px] text-sky-50 bg-indigo-400 pl-[10px] pr-[5px] rounded-sm font-semibold flex items-center gap-[10px] w-fit h-[20px] cursor-pointer transition-all duration-[300] ease-in-out hover:pl-[5px] hover:border-[1px] hover:border-black"
          onClick={() => router.push("/")}
        >
          <FaLongArrowAltLeft /> Back to homepage
        </span>
      </div>
      <div className="flex flex-col sm:flex-row align-start justify-center gap-[10px] pl-[20%] pr-[20%] mt-[20px]">
        <label className="cursor-pointer">
          <Image
            src={"/expiry-camera.png"}
            alt=""
            width={250}
            height={250}
            className="w-[180px] h-[180px] md:w-[250px] md:h-[250px]"
          />
          <input
            type="file"
            capture="user"
            accept="image/*"
            className="invisible"
          />
        </label>
        <div className="flex flex-col gap-[20px] items-start">
          <p className="font-head sm:text-sm md:text-lg mt-[5%] font-medium min-w-[200px]">
            Tap the camera to upload a photo of your product’s expiry date.
            We’ll track it for you!
          </p>
          <button
            className="sm:ml-none lg:ml-[20px] font-head bg-gradient-to-r from-blue-300 to-indigo-500 pt-[5px] pb-[5px] pl-[25px] pr-[25px] sm:text-sm lg:text-lg font-medium rounded-md border hover:border-black transition-all duration-300 ease-in-out"
            onClick={() => setAddManuallyBoxOpen(true)}
          >
            Add manually
          </button>
        </div>
      </div>
      {/* <ExpiryRecentProducts /> */}
    </div>
  );
};

export default ExpiryHome;
