"use client";
import AddExpireDetails from "@/components/AddExpireDetails/AddExpireDetails";
import ExpiryNav from "@/components/ExpiredNav/ExpiryNav";
import ExpiryNotification from "@/components/ExpiryNotifications/ExpiryNotification";
import ExpiryRecentProducts from "@/components/ExpiryRecentProducts/ExpiryRecentProducts";
import { UserContext } from "@/context/userContext";
import { getGoogleSignInUserData } from "@/services/authProvider";
import Image from "next/image";
import { redirect, usePathname, useRouter } from "next/navigation";
import React, { useContext, useEffect, useLayoutEffect } from "react";
import { FaLongArrowAltLeft } from "react-icons/fa";

const ExpiryHome = () => {
  const router = useRouter();

  const {
    notificationWindowOpen,
    user,
    setUserAllProduct,
    setUser,
    dataFetched,
    setDataFetched,
    setNotifications,
    setExpiryAlertProducts,
  } = useContext(UserContext);

  const [addManuallyBoxOpen, setAddManuallyBoxOpen] = React.useState(false);

  const [productLoading, setProductLoading] = React.useState<boolean>(true);

  const handleGetCurrentUser = React.useCallback(async () => {
    if (user) return;

    const request = await fetch("/api/me");

    const response = await request.json();

    if (response.data) {
      setUser(response.data);
    }
  }, []);

  const handleSetGoogleAuthUser = async () => {
    if (user) return;

    const userData: any = await getGoogleSignInUserData();

    if (userData) {
      const userPayload = {
        id: null,
        email: userData.user.email,
        continueWith: "google",
      };

      setUser(userPayload);
    }
  };

  const handleGetCurrentUserAllProductsData = async () => {
    if (!user) return;

    if (dataFetched) {
      setProductLoading(false);
      return;
    }

    const request = await fetch("/api/product/all", {
      method: "POST",
      body: JSON.stringify({
        userEmail: user.email,
      }),
    });

    const response = await request.json();

    if (response && response.allProductsData) {
      setUserAllProduct(response.allProductsData.products);
      setNotifications(response.allProductsData.appNotifications);
      setExpiryAlertProducts(response.allProductsData.expiryAlertProducts);
      setDataFetched(true);
    }
    setProductLoading(false);
  };

  async function handleAuth() {
    await handleSetGoogleAuthUser();
    await handleGetCurrentUser();
  }

  useLayoutEffect(() => {
    handleAuth();
  }, []);

  useEffect(() => {
    handleGetCurrentUserAllProductsData();
  }, [user]);

  return (
    <div className="min-h-dvh w-full bg-sky-100">
      {notificationWindowOpen && <ExpiryNotification />}
      {addManuallyBoxOpen && (
        <AddExpireDetails setAddManuallyBoxOpen={setAddManuallyBoxOpen} />
      )}
      <ExpiryNav productLoading={productLoading} />
      <div className="w-full h-[20px] pl-[10%] pt-[10px] mb-[10px]">
        <span
          className="font-head text-[15px] text-sky-50 bg-indigo-400 pl-[10px] pr-[5px] rounded-sm font-semibold flex items-center gap-[10px] w-fit h-[20px] cursor-pointer transition-all duration-[300] ease-in-out hover:pl-[5px] hover:border-black"
          onClick={() => router.push("/")}
        >
          <FaLongArrowAltLeft /> Back to homepage
        </span>
      </div>
      <div className="flex flex-col sm:flex-row align-start justify-center gap-[10px] pl-[10%] sm:pl-[20%] pr-[10%] sm:pr-[20%] mt-[20px]">
        <label className="cursor-pointer flex flex-col items-center">
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
            Tap the camera to upload a photo of your product&apos;s expiry date.
            We&apos;ll track it for you!
          </p>
          <button
            className="sm:ml-none lg:ml-[20px] font-head bg-gradient-to-r from-blue-300 to-indigo-500 pt-[5px] pb-[5px] pl-[25px] pr-[25px] sm:text-sm lg:text-lg font-medium rounded-md border hover:border-black transition-all duration-300 ease-in-out"
            onClick={() => setAddManuallyBoxOpen(true)}
          >
            Add manually
          </button>
        </div>
      </div>
      <ExpiryRecentProducts productLoading={productLoading} />
    </div>
  );
};

export default ExpiryHome;
