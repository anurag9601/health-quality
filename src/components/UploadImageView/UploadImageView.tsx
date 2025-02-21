"use client";
import Image from "next/image";
import React, { Dispatch, SetStateAction } from "react";

interface PropsType {
  file: File;
  setFile: Dispatch<SetStateAction<File | null>>;
  imagePreview: string;
}

const UploadImageView: React.FC<PropsType> = ({
  file,
  setFile,
  imagePreview,
}) => {
  const [loading, setLoading] = React.useState<boolean>(true);

  const convertResponseDataToJSON = (response: string) => {
    const innerJsonString = response
      .trim()
      .replace(/^```json\n/, "")
      .replace(/\n```$/, "");

    const realJsonObject = JSON.parse(innerJsonString);

    return realJsonObject;
  };
  const handleUserUploadRequest = async () => {
    const data = new FormData();
    data.set("file", file);

    const request = await fetch("/api/ai", {
      method: "POST",
      body: data,
    });

    const response = await request.json();

    const realJson = await convertResponseDataToJSON(response.response);

    console.log(realJson);
  };
  return (
    <div className="h-full w-full bg-neutral-600 bg-opacity-50 fixed flex items-center justify-center font-head">
      <div className="h-[70%] w-[90%] sm:w-[80%] md:w-[60%] lg:w-[40%] bg-orange-50 rounded-lg flex flex-col items-center justify-between pt-[20px] pb-[20px] pl-[10px] pr-[10px]">
        {!loading ? (
          <Image
            src={imagePreview}
            alt=""
            width={300}
            height={300}
            className="rounded-lg object-cover object-center overflow-hidden mb-[15px]"
          />
        ) : (
          <div className="h-full w-full flex items-center justify-center">
            <div className="border border-[8px] h-[80px] w-[80px] border-t-orange-500 border-t-[8px] rounded-full spin-animation"></div>
          </div>
        )}
        <div className="w-full h-[35px] flex justify-end pr-[20px] gap-[20px]">
          <button
            className={`pl-[20px] pr-[20px] pt-[5px] pb-[5px] rounded-lg text-lg border-dotted border-[2px] border-orange-700 flex items-center justify-center ${
              !loading && "hover:border-solid hover:border-orange-500"
            } ${loading && "opacity-[.5]"}`}
            onClick={() => setFile(null)}
            disabled={loading}
          >
            Cancel
          </button>
          <button
            className={`bg-gradient-to-r from-amber-400 to-orange-600 px-6 py-2 rounded-lg text-lg flex items-center justify-center 
  bg-[length:200%_200%] bg-left transition-all duration-500 ease-in-out 
  ${!loading && "hover:from-orange-600 hover:to-amber-400 hover:bg-right"} ${
              loading && "opacity-[.5]"
            }`}
            onClick={handleUserUploadRequest}
            disabled={loading}
          >
            Upload
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadImageView;
