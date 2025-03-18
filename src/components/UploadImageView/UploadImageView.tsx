"use client";
import {
  HealthAssessment,
  Ingredient,
  ProductDetails,
  UserContext,
} from "@/context/userContext";
import Image from "next/image";
import React, { Dispatch, SetStateAction, useContext } from "react";
import ProductDetailPreview from "../ProductDetailPreview/ProductDetailPreview";

interface PropsType {
  file: File;
  setFile: Dispatch<SetStateAction<File | null>>;
  imagePreview: string;
}

export interface CurrentDataPayload {
  userEmail: string;
  Product_Details: ProductDetails;
  Overall_Health_Assessment: HealthAssessment;
  Ingredients_Information: Ingredient[];
  productImgURL: string;
}

const UploadImageView: React.FC<PropsType> = ({
  file,
  setFile,
  imagePreview,
}) => {
  const { user } = useContext(UserContext);

  const [loading, setLoading] = React.useState<boolean>(false);

  const [currentDataPayload, setCurrentDataPayload] =
    React.useState<CurrentDataPayload | null>(null);

  const convertResponseDataToJSON = async (response: string) => {
    const innerJsonString = response
      .trim()
      .replace(/^```json\n/, "")
      .replace(/\n```$/, "");

    const realJsonObject = await JSON.parse(innerJsonString);

    return realJsonObject;
  };

  const handleUserUploadRequest = async () => {
    setLoading(true);

    const data = new FormData();
    data.set("file", file);

    const request = await fetch("/api/ai", {
      method: "POST",
      body: data,
    });

    const response = await request.json();

    if (response.error === true) {
      alert(response.message);
      return;
    }

    if (response) {
      const realJson = await convertResponseDataToJSON(response.response);

      if (realJson.error) {
        setLoading(false);
        setFile(null);
        alert(realJson.error);
        return;
      }

      if (user) {
        const payload = {
          userEmail: user.email,
          productImgURL: imagePreview,
          Ingredients_Information: realJson["Ingredients Information"],
          Overall_Health_Assessment: realJson["Overall Health Assessment"],
          Product_Details: realJson["Product Details"],
        };

        setCurrentDataPayload(payload);
      }

      setLoading(false);
    } else {
      alert("Oops🥴 something went wrong..");
      setLoading(false);
    }
  };
  return (
    <>
      {loading ? (
        <div className="h-full w-full bg-orange-50 fixed rounded-lg z-[1]">
          <div className="w-full h-fit pt-[5px] pb-[5px] text-lg flex items-center justify-center pl-[5%] pr-[5%]">
            <div className="w-[150px] md:w-[200px] h-[20px] bg-orange-200 rounded-md loading-animation mt-[4px] mb-[4px]"></div>
          </div>
          <hr className="h-[1px] w-full bg-gray-500 border-none" />
          <div className="h-full w-full overflow-y-scroll p-[10px] scrollbar-thin scrollbar-thumb-orange-300 scrollbar-track-orange-100">
            <div className="flex flex-col-reverse gap-[10px] items-center sm:flex-row sm:items-start">
              <div className="w-full h-fit">
                <div className="font-normal flex items-center gap-[10px] text-lg">
                  <span className="font-head font-medium text-lg bg-orange-300 pt-[0px] pb-[0px] pl-[7px] pr-[7px] rounded-md">
                    Healthy
                  </span>
                  <div className="h-[20px] w-[20px] rounded-full bg-orange-200 loading-animation"></div>
                </div>
                <div className="font-normal flex flex-col items-start gap-[0px] mt-[10px]">
                  <span className="font-head font-medium text-lg bg-orange-300 pt-[0px] pb-[0px] pl-[7px] pr-[7px] rounded-md mb-[7px]">
                    Overall Health Assessment
                  </span>
                  <div className="text-sm w-full h-fit flex flex-col gap-[5px]">
                    <div className="h-[13px] w-full bg-orange-200 rounded loading-animation"></div>
                    <div></div>
                    <div className="h-[13px] w-full bg-orange-200 rounded loading-animation"></div>
                    <div></div>
                  </div>
                </div>
                <div className="mt-[10px] flex items-center gap-[10px]">
                  <span className="font-head font-medium text-lg bg-orange-300 pt-[0px] pb-[0px] pl-[7px] pr-[7px] rounded-md">
                    Expiry Date
                  </span>
                  <span className="h-[13px] w-[100px] md:w-[150px] bg-orange-200 rounded loading-animation"></span>
                </div>
                <div className="mt-[10px] flex items-center gap-[10px]">
                  <span className="font-head font-medium text-lg bg-orange-300 pt-[0px] pb-[0px] pl-[7px] pr-[7px] rounded-md">
                    Manufacture Date
                  </span>
                  <span className="h-[13px] w-[100px] md:w-[150px] bg-orange-200 rounded loading-animation"></span>
                </div>
              </div>
              <div className="max-w-[200px] min-h-[200px] w-full h-full p-[10px] bg-orange-200 rounded-lg cursor-pointer loading-animation"></div>
            </div>
            <div className="mt-[20px] mb-[80px] flex flex-col gap-[10px]">
              <div className="flex flex-col gap-[5px] items-center text-lg font-medium mb-[20px] pl-[5px] pr-[5px] font-head">
                <hr className="h-[1px] w-full bg-gray-500 border-none" />
                <h3>Ingredients Information</h3>
                <hr className="h-[1px] w-full bg-gray-500 border-none" />
              </div>
              <div className="flex flex-col gap-[4px] bg-orange-100 rounded-lg pt-[10px] pb-[10px] pl-[10px] pr-[10px]">
                <div className="font-normal flex items-center gap-[10px]">
                  <span className="font-head font-medium text-lg bg-orange-300 pt-[0px] pb-[0px] pl-[7px] pr-[7px] rounded-md">
                    Name
                  </span>
                  <span className="h-[13px] w-[100px] md:w-[150px] bg-orange-200 rounded loading-animation"></span>
                </div>
                <div className="font-normal flex items-center gap-[10px]">
                  <span className="font-head font-medium text-lg bg-orange-300 pt-[0px] pb-[0px] pl-[7px] pr-[7px] rounded-md">
                    Is Healthy
                  </span>
                  <span className="h-[13px] w-[100px] md:w-[150px] bg-orange-200 rounded loading-animation"></span>
                </div>
                <div className="font-normal flex flex-col sm:flex-row items-start gap-[3px] sm:gap-[10px] mb-[5px] sm:mb-[0px] mt-[5px] sm:mt-[0px]">
                  <span className="font-head font-medium text-lg bg-orange-300 pt-[0px] pb-[0px] pl-[7px] pr-[7px] rounded-md">
                    Description
                  </span>
                  <div className="h-[13px] w-full bg-orange-200 rounded loading-animation"></div>
                  <div></div>
                </div>
                <div className="font-normal flex flex-col sm:flex-row items-start gap-[3px] sm:gap-[10px] mb-[5px] sm:mb-[0px] mt-[0px] sm:mt-[0px]">
                  <span className="font-head font-medium text-lg bg-orange-300 pt-[0px] pb-[0px] pl-[7px] pr-[7px] rounded-md max-w-fit w-full">
                    Not Good For
                  </span>
                  <span className="h-[13px] w-full bg-orange-200 rounded loading-animation"></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="h-full w-full bg-neutral-600 bg-opacity-50 fixed flex items-center justify-center font-head z-[1]">
          {currentDataPayload === null ? (
            <div className="h-[70%] w-[90%] sm:w-[80%] md:w-[60%] lg:w-[40%] bg-orange-50 rounded-lg flex flex-col items-center justify-center pt-[20px] pb-[20px] pl-[10px] pr-[10px]">
              <Image
                src={imagePreview}
                alt=""
                width={300}
                height={300}
                className="rounded-lg object-cover object-center overflow-hidden mb-[15px] flex-1"
              />
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
          ) : (
            <ProductDetailPreview
              file={file}
              setFile={setFile}
              currentDataPayload={currentDataPayload}
              setCurrentDataPayload={setCurrentDataPayload}
            />
          )}
        </div>
      )}
    </>
  );
};

export default UploadImageView;
