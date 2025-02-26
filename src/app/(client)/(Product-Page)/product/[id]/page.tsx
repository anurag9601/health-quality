"use client";
import { UserContext } from "@/context/userContext";
import Image from "next/image";
import { redirect, useParams } from "next/navigation";
import React, { useContext } from "react";
import { AiOutlineFullscreenExit } from "react-icons/ai";
import { FaCheckCircle } from "react-icons/fa";
import { MdCancel } from "react-icons/md";

const ProductPage = () => {
  const { id } = useParams();

  const { currentOpenProduct } = useContext(UserContext);

  if (!currentOpenProduct) {
    redirect("/");
  }

  const [imgPreviewWindowOpen, setImgPreviewWindowOpen] =
    React.useState<boolean>(false);

  return (
    <div className="min-h-full w-full bg-orange-50 rounded-lg">
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
              src={currentOpenProduct.productImgURL}
              alt=""
              width={300}
              height={300}
              className="rounded-lg object-cover object-center overflow-hidden mb-[15px]"
            />
          </div>
        </div>
      )}
      <h3 className="w-full h-fit pt-[5px] pb-[5px] text-lg text-center pl-[5%] pr-[5%] font-head">
        {currentOpenProduct.Product_Details.product_name
          ? currentOpenProduct.Product_Details.product_name
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
              {currentOpenProduct.Overall_Health_Assessment.healthy ? (
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
                  currentOpenProduct.Overall_Health_Assessment
                    .overall_health_assessment
                }
              </span>
            </div>
            <div className="mt-[10px] flex items-center gap-[10px]">
              <span className="font-head font-medium text-lg bg-orange-300 pt-[0px] pb-[0px] pl-[7px] pr-[7px] rounded-md">
                Expiry Date
              </span>
              <span className="font-normal text-sm">
                {currentOpenProduct.Product_Details.expiry_date
                  ? currentOpenProduct.Product_Details.expiry_date
                  : "unavailable..."}
              </span>
            </div>
            <div className="mt-[10px] flex items-center gap-[10px]">
              <span className="font-head font-medium text-lg bg-orange-300 pt-[0px] pb-[0px] pl-[7px] pr-[7px] rounded-md">
                Manufacture Date
              </span>
              <span className="font-normal text-sm">
                {currentOpenProduct.Product_Details.manufacture_date
                  ? currentOpenProduct.Product_Details.manufacture_date
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
              src={currentOpenProduct.productImgURL}
              alt=""
              className="rounded-lg object-cover object-center overflow-hidden"
            />
          </div>
        </div>
        <div className="mt-[20px] flex flex-col gap-[10px]">
          <div className="flex flex-col gap-[5px] items-center text-lg font-medium mb-[20px] pl-[5px] pr-[5px]">
            <hr className="h-[1px] w-full bg-gray-500 border-none" />
            <h3>Ingredients Information</h3>
            <hr className="h-[1px] w-full bg-gray-500 border-none" />
          </div>
          {currentOpenProduct.Ingredients_Information.map(
            (ingredient: any, index: number) => (
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
    </div>
  );
};

export default ProductPage;
