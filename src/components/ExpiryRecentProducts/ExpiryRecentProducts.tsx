import { UserContext } from "@/context/userContext";
import Image from "next/image";
import React from "react";
import { AiOutlineProduct } from "react-icons/ai";

interface propsDataType {
  productLoading: boolean;
}

const ExpiryRecentProducts: React.FC<propsDataType> = ({ productLoading }) => {
  const { expiryAlertProducts } = React.useContext(UserContext);

  return (
    <div className="pl-[10%] pr-[10%] mt-[20px]">
      <div className="flex items-start gap-[10px]">
        <h4 className="font-head sm:text-sm md:text-lg">Recent Add Products</h4>
        <Image src="/expired-product.png" alt="" height={35} width={35} />
      </div>
      <hr className="h-[1px] w-full bg-gray-500 border-none mt-[10px]" />
      {productLoading ? (
        <div className="flex flex-col w-full h-fit">
          <div className="h-[45px] w-full bg-blue-200 flex items-center justify-between pl-[3%] pr-[3%]">
            <div className="flex flex-1 items-center justify-start gap-[10px] md:gap-[20px]">
              <div className="h-[20px] w-[20px] rounded-full bg-indigo-400"></div>
              <div className="h-[20px] w-[60%] md:w-[30%] bg-indigo-400 rounded loading-animation"></div>
            </div>
            <Image
              src={"/delete.png"}
              alt=""
              height={30}
              width={30}
              className="h-[25px] w-[25px] grayscale"
            />
          </div>
          <hr className="h-[1px] w-full bg-gray-500 border-none" />
          <div className="h-[45px] w-full bg-blue-200 flex items-center justify-between pl-[3%] pr-[3%]">
            <div className="flex flex-1 items-center justify-start gap-[10px] md:gap-[20px]">
              <div className="h-[20px] w-[20px] rounded-full bg-indigo-400"></div>
              <div className="h-[20px] w-[60%] md:w-[30%] bg-indigo-400 rounded loading-animation"></div>
            </div>
            <Image
              src={"/delete.png"}
              alt=""
              height={30}
              width={30}
              className="h-[25px] w-[25px] grayscale"
            />
          </div>
          <hr className="h-[1px] w-full bg-gray-500 border-none" />
        </div>
      ) : (
        <>
          {expiryAlertProducts.length === 0 && (
            <div className="p-[30px] flex flex-col items-center justify-center gap-[5px]">
              <span className="text-[25px] sm:text-[35px]">
                <AiOutlineProduct />
              </span>
              <p className="font-head text-sm sm:text-lg text-center">
                You have&apos;n added any products for expiry alerts yet.
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ExpiryRecentProducts;
