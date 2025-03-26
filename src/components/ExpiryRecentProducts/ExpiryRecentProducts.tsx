import { UserContext } from "@/context/userContext";
import Image from "next/image";
import React from "react";
import { AiOutlineProduct } from "react-icons/ai";

interface propsDataType {
  productLoading: boolean;
}

const ExpiryRecentProducts: React.FC<propsDataType> = ({ productLoading }) => {
  const { expiryAlertProducts, setExpiryAlertProducts, setNotifications } =
    React.useContext(UserContext);

  const [deleteProductId, setDeleteProductId] = React.useState<string | null>(
    null
  );

  // function daysBetween(day1: string, day2: string) {
  //   const time1 = new Date(day1).getTime();
  //   const time2 = new Date(day2).getTime();

  //   const diff = Math.abs(time2 - time1);

  //   return Math.ceil(diff / (24 * 60 * 60 * 1000));
  // }

  function daysToExpire(expiryDate: string) {
    const expiry = new Date(expiryDate).getTime();
    const currentTime = Date.now();

    const diff = Math.abs(currentTime - expiry);

    return Math.ceil(diff / (24 * 60 * 60 * 1000));
  }

  function isExpired(expiryDate: string) {
    const expiryDateInMiliSecond = new Date(expiryDate).getTime();
    const currentDateInMiliSecond = Date.now();

    if (currentDateInMiliSecond > expiryDateInMiliSecond) return true;

    return false;
  }

  async function handleDeletedProduct(productId: string) {
    const request = await fetch("/api/expiry-alert/delete", {
      method: "POST",
      body: JSON.stringify({
        deleteId: productId,
      }),
    });

    const response = await request.json();

    if (response.success) {
      const newExpiryProductList = expiryAlertProducts.filter(
        (product) => product._id !== productId
      );

      setExpiryAlertProducts(newExpiryProductList);

      setNotifications((prev) => [response.newNotification, ...prev]);
    } else {
      alert(response.error);
    }

    setDeleteProductId(null);
  }

  return (
    <div
      className={`pl-[10%] pr-[10%] mt-[20px] mb-[30px] ${
        deleteProductId && "opacity-[.5]"
      }`}
    >
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
          {expiryAlertProducts.length === 0 ? (
            <div className="p-[30px] flex flex-col items-center justify-center gap-[5px]">
              <span className="text-[25px] sm:text-[35px]">
                <AiOutlineProduct />
              </span>
              <p className="font-head text-sm sm:text-lg text-center">
                You have&apos;n added any products for expiry alerts yet.
              </p>
            </div>
          ) : (
            <>
              {expiryAlertProducts &&
                expiryAlertProducts.map((product, index) => (
                  <div className="w-full h-full" key={index}>
                    <div
                      className={`h-fit w-full flex items-center justify-between gap-[20px] pl-[3%] pr-[3%] pt-[5px] pb-[5px] ${
                        !deleteProductId
                          ? "hover:bg-indigo-200 cursor-pointer"
                          : "cursor-not-allowed"
                      } transition-all duration-200 ease-in-out`}
                    >
                      <div className="w-fit flex flex-col items-start flex-1">
                        <p className="font-head text-md">
                          {product.productName.slice(0, 30)}
                          {product.productName.length > 30 && "..."}
                        </p>
                        <div className="flex flex-col flex-1">
                          <p className="font-head text-xs sm:text-sm font-[500] text-slate-500 font-semibold">
                            Expiry Date:{" "}
                            <span className="text-black">
                              {product.expiryDate}
                            </span>
                          </p>
                          <p className="font-head text-xs sm:text-sm font-[500] text-slate-500 font-semibold">
                            Manufacture Date:{" "}
                            <span className="text-black">
                              {product.manufactureDate}
                            </span>
                          </p>
                        </div>
                      </div>
                      <p className="flex-1 text-[14px] sm:text-[17px] font-head font-bold text-red-600 hidden sm:block">
                        {isExpired(product.expiryDate)
                          ? "Expired"
                          : `${daysToExpire(
                              product.expiryDate
                            )} Days to expire`}
                      </p>
                      <div className="flex flex-col items-end justify-center gap-[2px]">
                        {deleteProductId == product._id ? (
                          <div className="h-[20px] w-[20px] rounded-full border border-[3px] border-t-indigo-500 border-t-[3px] spin-animation"></div>
                        ) : (
                          <Image
                            src={"/delete.png"}
                            alt=""
                            height={30}
                            width={30}
                            className="cursor-pointer h-[25px] w-[25px]"
                            onClick={() => {
                              if (!deleteProductId) {
                                setDeleteProductId(product._id);
                                handleDeletedProduct(product._id);
                              }
                            }}
                          />
                        )}
                        <p className="flex-1 text-[14px] font-head font-bold text-red-600 block sm:hidden">
                          {isExpired(product.expiryDate)
                            ? "Expired"
                            : `${daysToExpire(
                                product.expiryDate
                              )} Days to expire`}
                        </p>
                      </div>
                    </div>
                    <hr className="h-[1px] w-full bg-gray-500 border-none" />
                  </div>
                ))}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default ExpiryRecentProducts;
