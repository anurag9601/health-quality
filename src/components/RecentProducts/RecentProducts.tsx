"use client";
import { UserContext, UserProduct } from "@/context/userContext";
import Image from "next/image";
import { redirect, useRouter } from "next/navigation";
import React, { useContext } from "react";
import { AiOutlineProduct } from "react-icons/ai";
import { FaCircleCheck } from "react-icons/fa6";
import { MdCancel } from "react-icons/md";

interface RecentProductsPropsType {
  productLoading: boolean;
}

const RecentProducts: React.FC<RecentProductsPropsType> = ({
  productLoading,
}) => {
  const router = useRouter();

  const { userAllProduct, setUserAllProduct, setCurrentOpenProduct } =
    useContext(UserContext);

  const [deleteId, setDeleteId] = React.useState<string | null>(null);

  const deleteBtnClick = React.useRef<boolean>(false);

  const handleProductOnClick = (product: UserProduct) => {
    if (deleteBtnClick.current || deleteId) return;

    setCurrentOpenProduct(product);
    router.push(`/product/${product._id}`);
  };

  const handleUserDeleteProduct = async (id: string) => {
    deleteBtnClick.current = true;
    if (!id || deleteId) return;

    setDeleteId(id);

    const request = await fetch(`/api/product/delete/${id}`);

    const respose = await request.json();

    if (respose.success === true) {
      const newUserAllProductsList = userAllProduct.filter(
        (product) => product._id !== id
      );

      setUserAllProduct(newUserAllProductsList);
    } else {
      alert("Something went wrong...");
    }
    setDeleteId(null);
    deleteBtnClick.current = false;
  };

  return (
    <div className="pl-[10%] pr-[10%]">
      <div
        className={`flex items-start gap-[10px] ${deleteId && "opacity-[.7]"}`}
      >
        <h4 className="font-head sm:text-sm md:text-lg">Recent add products</h4>{" "}
        <Image src="/healthy-food.png" alt="" width={40} height={40} />
      </div>
      <hr className="h-[1px] w-full bg-gray-500 border-none mt-[10px]" />
      {productLoading === true ? (
        <div className="flex flex-col w-full h-fit">
          <div className="h-[45px] w-full bg-orange-100 flex items-center justify-between pl-[3%] pr-[3%]">
            <div className="flex flex-1 items-center justify-start gap-[10px] md:gap-[20px]">
              <div className="h-[20px] w-[20px] rounded-full bg-orange-200"></div>
              <div className="h-[20px] w-[60%] md:w-[30%] bg-orange-200 rounded loading-animation"></div>
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
          <div className="h-[45px] w-full bg-orange-100 flex items-center justify-between pl-[3%] pr-[3%]">
            <div className="flex flex-1 items-center justify-start gap-[10px] md:gap-[20px]">
              <div className="h-[20px] w-[20px] rounded-full bg-orange-200"></div>
              <div className="h-[20px] w-[60%] md:w-[30%] bg-orange-200 rounded loading-animation"></div>
            </div>
            <Image
              src={"/delete.png"}
              alt=""
              height={30}
              width={30}
              className="cursor-pointer h-[25px] w-[25px] grayscale"
            />
          </div>
          <hr className="h-[1px] w-full bg-gray-500 border-none" />
        </div>
      ) : (
        <>
          {userAllProduct.length === 0 ? (
            <div className="p-[30px] flex flex-col items-center justify-center gap-[5px]">
              <span className="text-[25px] sm:text-[35px]">
                <AiOutlineProduct />
              </span>
              <p className="font-head text-sm sm:text-lg">
                You have not added any products yet.
              </p>
            </div>
          ) : (
            <>
              {userAllProduct.map((product: UserProduct, index: number) => (
                <div
                  className={`h-full w-full ${deleteId && "opacity-[.7]"}`}
                  key={index}
                  onClick={() => handleProductOnClick(product)}
                >
                  <div
                    className={`h-[45px] w-full flex items-center justify-between pl-[3%] pr-[3%] pt-[10px] pb-[10px] ${
                      !deleteId && "hover:bg-orange-200 cursor-pointer"
                    } transition-all duration-200 ease-in-out`}
                  >
                    <div className="w-fit flex items-center gap-[10px] md:gap-[20px]">
                      {product.Overall_Health_Assessment.healthy ? (
                        <FaCircleCheck className="text-[20px] md:text-[20px] text-lime-600" />
                      ) : (
                        <MdCancel className="text-[23px] md:text-[23px] text-red-600" />
                      )}
                      <p className="font-head text-lg">
                        {product.Product_Details.product_name?.slice(0, 20)}
                        {product.Product_Details.product_name &&
                          product.Product_Details.product_name.length > 20 &&
                          "..."}
                      </p>
                    </div>
                    {/* <div className="hidden sm:hidden md:flex items-center gap-[40px] font-head">
                <p>
                  <span className="text-teal-600 font-semibold">Healthy:</span>{" "}
                  30%
                </p>
                <p>
                  <span className="text-red-600 font-semibold">Unhealthy:</span>{" "}
                  70%
                </p>
              </div> */}
                    {deleteId === product._id ? (
                      <div className="h-[20px] w-[20px] rounded-full border border-[3px] border-t-orange-500 border-t-[3px] spin-animation"></div>
                    ) : (
                      <Image
                        src={"/delete.png"}
                        alt=""
                        height={30}
                        width={30}
                        className="cursor-pointer h-[25px] w-[25px]"
                        onClick={() => handleUserDeleteProduct(product._id)}
                      />
                    )}
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

export default RecentProducts;
