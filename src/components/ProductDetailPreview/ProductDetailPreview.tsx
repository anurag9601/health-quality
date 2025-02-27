"use client";
import { Ingredient, UserContext } from "@/context/userContext";
import Image from "next/image";
import React, { Dispatch, SetStateAction, useContext } from "react";
import { AiOutlineFullscreenExit } from "react-icons/ai";
import { FaCheckCircle } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import { CurrentDataPayload } from "../UploadImageView/UploadImageView";

interface productDetailPreviewPropTypes {
  file: File;
  setFile: Dispatch<SetStateAction<File | null>>;
  currentDataPayload: CurrentDataPayload;
  setCurrentDataPayload: Dispatch<SetStateAction<CurrentDataPayload | null>>;
}

const ProductDetailPreview: React.FC<productDetailPreviewPropTypes> = ({
  file,
  setFile,
  currentDataPayload,
  setCurrentDataPayload,
}) => {
  const { setUserAllProduct } = useContext(UserContext);

  const [loading, setLoading] = React.useState(false);

  const [imgPreviewWindowOpen, setImgPreviewWindowOpen] =
    React.useState<boolean>(false);

  const handleUserHomePageRedirect = () => {
    setFile(null);
    setCurrentDataPayload(null);
    setImgPreviewWindowOpen(false);
  };

  const generateFileURLFromCloudinary = async (file: File) => {
    try {
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "food-quality-app");
      data.append("cloud_name", "deqs6ry98");

      const res = await fetch(
        `https://api.cloudinary.com/v1_1/deqs6ry98/image/upload`,
        {
          method: "POST",
          body: data,
        }
      );

      const uploadImageURL = await res.json();

      return uploadImageURL.url;
    } catch (err) {
      alert("Something went wrong while sending file on cloudinary");
      console.log("Error in generateFileURLFromCloudinary function", err);
      return;
    }
  };

  const pushProductDataInDB = async () => {
    setLoading(true);

    const productImgURL = await generateFileURLFromCloudinary(file);

    currentDataPayload.productImgURL = productImgURL;

    const dataBaseRequest = await fetch("api/product/add", {
      method: "POST",
      body: JSON.stringify(currentDataPayload),
    });

    const dataBaseResponse = await dataBaseRequest.json();

    if (dataBaseResponse.addProduct) {
      setUserAllProduct((prev) => [...prev, dataBaseResponse.addProduct]);
      handleUserHomePageRedirect();
    }

    setLoading(false);
  };
  return (
    <div className="h-full w-full bg-orange-50 rounded-lg">
      {imgPreviewWindowOpen && (
        <div className="fixed h-full w-full bg-neutral-600 bg-opacity-50 flex items-center justify-center">
          <div className="h-[70%] w-[90%] sm:w-[80%] md:w-[60%] lg:w-[40%] bg-orange-50 rounded-lg flex flex-col items-center justify-between pt-[5px] pb-[5px] pl-[5px] pr-[5px]">
            <div className="h-[20px] w-full mb-[3px] flex items-center justify-end">
              <AiOutlineFullscreenExit
                className="text-xl cursor-pointer text-orange-500 hover:text-orange-800"
                onClick={() => setImgPreviewWindowOpen(false)}
              />
            </div>
            <Image
              src={currentDataPayload.productImgURL}
              alt=""
              width={300}
              height={300}
              className="rounded-lg object-cover object-center overflow-hidden mb-[15px]"
            />
          </div>
        </div>
      )}
      <h3 className="w-full h-fit pt-[5px] pb-[5px] text-lg text-center pl-[5%] pr-[5%]">
        {currentDataPayload.Product_Details.product_name
          ? currentDataPayload.Product_Details.product_name
          : "Product"}
      </h3>
      <hr className="h-[1px] w-full bg-gray-500 border-none" />
      <div className="h-full w-full overflow-y-scroll p-[10px] scrollbar-thin scrollbar-thumb-orange-300 scrollbar-track-orange-100">
        <div className="flex flex-col-reverse gap-[10px] items-center sm:flex-row sm:items-start">
          <div className="w-full h-fit">
            <p className="font-normal flex items-center gap-[10px] text-lg">
              <span className="font-head font-medium text-lg bg-orange-300 pt-[0px] pb-[0px] pl-[7px] pr-[7px] rounded-md">
                Healthy
              </span>
              {currentDataPayload.Overall_Health_Assessment.healthy ? (
                <FaCheckCircle className="text-lg text-green-600" />
              ) : (
                <MdCancel className="text-lg text-red-500" />
              )}
            </p>
            <div className="font-normal flex flex-col items-start gap-[0px] mt-[10px]">
              <span className="font-head font-medium text-lg bg-orange-300 pt-[0px] pb-[0px] pl-[7px] pr-[7px] rounded-md mb-[7px]">
                Overall Health Assessment
              </span>
              <span className="text-sm">
                {
                  currentDataPayload.Overall_Health_Assessment
                    .overall_health_assessment
                }
              </span>
            </div>
            <div className="mt-[10px] flex items-center gap-[10px]">
              <span className="font-head font-medium text-lg bg-orange-300 pt-[0px] pb-[0px] pl-[7px] pr-[7px] rounded-md">
                Expiry Date
              </span>
              <span className="font-normal text-sm">
                {currentDataPayload.Product_Details.expiry_date
                  ? currentDataPayload.Product_Details.expiry_date
                  : "unavailable..."}
              </span>
            </div>
            <div className="mt-[10px] flex items-center gap-[10px]">
              <span className="font-head font-medium text-lg bg-orange-300 pt-[0px] pb-[0px] pl-[7px] pr-[7px] rounded-md">
                Manufacture Date
              </span>
              <span className="font-normal text-sm">
                {currentDataPayload.Product_Details.manufacture_date
                  ? currentDataPayload.Product_Details.manufacture_date
                  : "unavailable..."}
              </span>
            </div>
          </div>
          <div
            className="w-fit h-fit p-[10px] bg-orange-200 rounded-lg cursor-pointer"
            onClick={() => setImgPreviewWindowOpen(true)}
          >
            <Image
              height={200}
              width={200}
              src={currentDataPayload.productImgURL}
              alt=""
              className="rounded-lg object-cover object-center overflow-hidden"
            />
          </div>
        </div>
        <div className="mt-[20px] mb-[80px] flex flex-col gap-[10px]">
          <div className="flex flex-col gap-[5px] items-center text-lg font-medium mb-[20px] pl-[5px] pr-[5px]">
            <hr className="h-[1px] w-full bg-gray-500 border-none" />
            <h3>Ingredients Information</h3>
            <hr className="h-[1px] w-full bg-gray-500 border-none" />
          </div>
          {currentDataPayload.Ingredients_Information.map(
            (ingredient: Ingredient, index: number) => (
              <div
                className="flex flex-col gap-[4px] bg-orange-100 rounded-lg pt-[10px] pb-[10px] pl-[10px] pr-[10px]"
                key={index}
              >
                <p className="font-normal flex items-center gap-[10px]">
                  <span className="font-head font-medium text-lg bg-orange-300 pt-[0px] pb-[0px] pl-[7px] pr-[7px] rounded-md">
                    Name
                  </span>
                  <span className="text-[14px] font-[500]">
                    {ingredient.name}
                  </span>
                </p>
                <p className="font-normal flex items-center gap-[10px]">
                  <span className="font-head font-medium text-lg bg-orange-300 pt-[0px] pb-[0px] pl-[7px] pr-[7px] rounded-md">
                    Is Healthy
                  </span>
                  <span className="text-[14px] font-[500]">
                    {ingredient.healthy}
                  </span>
                </p>
                <p className="font-normal flex flex-col sm:flex-row items-start gap-[3px] sm:gap-[10px] mb-[5px] sm:mb-[0px] mt-[5px] sm:mt-[0px]">
                  <span className="font-head font-medium text-lg bg-orange-300 pt-[0px] pb-[0px] pl-[7px] pr-[7px] rounded-md">
                    Description
                  </span>
                  <span className="text-sm font-[500]">
                    {ingredient.description}
                  </span>
                </p>
                <p className="font-normal flex flex-col sm:flex-row items-start gap-[3px] sm:gap-[10px] mb-[5px] sm:mb-[0px] mt-[5px] sm:mt-[0px]">
                  <span className="font-head font-medium text-lg bg-orange-300 pt-[0px] pb-[0px] pl-[7px] pr-[7px] rounded-md">
                    Not Good For
                  </span>
                  <span className="text-sm font-[500]">
                    {ingredient.not_good_for}
                  </span>
                </p>
              </div>
            )
          )}
        </div>
      </div>
      <div className="w-full flex items-center gap-[20px] justify-end pl-[5%] pr-[5%] pt-[8px] pb-[8px] fixed bottom-[0px] border-t border-gray-500 bg-transparent backdrop-blur-sm">
        <button
          className={`h-[35px] pl-[20px] pr-[20px] pt-[5px] pb-[5px] rounded-lg text-lg border-dotted border-[2px] border-orange-700 flex items-center justify-center ${
            !loading
              ? "hover:border-solid hover:border-orange-500"
              : "opacity-[.5]"
          }`}
          onClick={handleUserHomePageRedirect}
          disabled={loading}
        >
          Cancel
        </button>
        <button
          className={`h-[35px] bg-gradient-to-r from-amber-400 to-orange-600 px-6 py-2 rounded-lg text-lg flex items-center justify-center 
  bg-[length:200%_200%] bg-left transition-all duration-500 ${
    !loading
      ? "ease-in-out hover:from-orange-600 hover:to-amber-400 hover:bg-right"
      : "opacity-[.5]"
  } flex items-center justify-center`}
          onClick={pushProductDataInDB}
          disabled={loading}
        >
          {loading ? (
            <div className="h-[20px] w-[20px] rounded-full border border-[3px] border-t-orange-500 border-t-[3px] spin-animation"></div>
          ) : (
            "Add"
          )}
        </button>
      </div>
    </div>
  );
};

export default ProductDetailPreview;
