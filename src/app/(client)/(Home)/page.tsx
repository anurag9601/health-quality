"use client";
import HomeNav from "@/components/HomeNav/HomeNav";
import Image from "next/image";
import React, { ChangeEvent } from "react";

const Home = () => {
  const [file, setFile] = React.useState<File | null>(null);

  console.log(file);
  return (
    <div className="h-full w-full bg-orange-50">
      <HomeNav />
      <div className="flex flex-col sm:flex-row align-start justify-center gap-[10px] pl-[20%] pr-[20%] mt-[20px]">
        <label className="cursor-pointer">
          <Image src={"/camera.png"} alt="" width={300} height={200} />
          <input
            type="file"
            capture="user"
            accept="image/*"
            className="h-full w-full invisible"
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              console.log(e);
            }}
          />
        </label>
        <div>
          <p className="font-head sm:text-sm md:text-lg mt-[5%] font-medium flex flex-col">
            Tap on the camera to upload a photo of your food ingredient, and
            I’ll help you with all the details about it!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
