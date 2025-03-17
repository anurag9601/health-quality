"use client";
import HomeNav from "@/components/HomeNav/HomeNav";
import Notifications from "@/components/Notifications/Notifications";
import RecentProducts from "@/components/RecentProducts/RecentProducts";
import UploadImageView from "@/components/UploadImageView/UploadImageView";
import { UserContext } from "@/context/userContext";
import { getGoogleSignInUserData } from "@/services/authProvider";
import Image from "next/image";
import { redirect } from "next/navigation";
import React, { ChangeEvent, useContext, useEffect } from "react";

const Home = () => {
  const {
    user,
    setUser,
    setNotifications,
    setUserAllProduct,
    notificationWindowOpen,
  } = useContext(UserContext);

  const [file, setFile] = React.useState<File | null>(null);

  const [imagePreview, setImagePreview] = React.useState<string | null>(null);

  const [productLoading, setProductLoading] = React.useState<boolean>(true);

  const uploadFileInputRef = React.useRef<HTMLInputElement | null>(null);

  const handleFileUploadOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      if (file.type.split("/")[0] !== "image") {
        alert("Upload file is not an image..");
        return;
      }
      setFile(file);
      const imageURL = URL.createObjectURL(file);
      setImagePreview(imageURL);
    }
  };

  const handleUploadFileBtnClick = () => {
    if (uploadFileInputRef.current) {
      uploadFileInputRef.current.click();
    }
  };

  const handleGetCurrentUser = React.useCallback(async () => {
    const request = await fetch("/api/me");

    const response = await request.json();

    if (response.data) {
      setUser(response.data);
    } else {
      redirect("/signin");
    }
  }, [setUser]);

  const handleSetGoogleAuthUser = async () => {
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
    }

    setProductLoading(false);
  };

  useEffect(() => {
    handleGetCurrentUser();
  }, [handleGetCurrentUser]);

  useEffect(() => {
    handleSetGoogleAuthUser();
  }, []);

  useEffect(() => {
    handleGetCurrentUserAllProductsData();
  }, [user]);

  return (
    <div className="min-h-dvh w-full bg-orange-50 overflow-x-hidden">
      {notificationWindowOpen && <Notifications />}
      {file && imagePreview && (
        <UploadImageView
          file={file}
          setFile={setFile}
          imagePreview={imagePreview}
        />
      )}
      <HomeNav />
      <div className="flex flex-col sm:flex-row align-start justify-center gap-[10px] pl-[20%] pr-[20%] mt-[20px]">
        <label className="cursor-pointer">
          <Image
            src={"/camera.png"}
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
            onChange={handleFileUploadOnChange}
          />
        </label>
        <div className="flex flex-col gap-[20px] items-start">
          <p className="font-head sm:text-sm md:text-lg mt-[5%] font-medium min-w-[200px]">
            Tap on the camera to click then upload a photo of your food
            ingredient, and I’ll help you with all the details about it!
          </p>
          <button
            className="sm:ml-none lg:ml-[20px] font-head bg-gradient-to-r from-yellow-500 to-red-500 pt-[5px] pb-[5px] pl-[25px] pr-[25px] sm:text-sm lg:text-lg font-medium rounded-md border hover:border-black transition-all duration-300 ease-in-out"
            onClick={handleUploadFileBtnClick}
          >
            Upload image
          </button>
          <input
            type="file"
            className="invisible h-[1px] w-[1px]"
            ref={uploadFileInputRef}
            onChange={handleFileUploadOnChange}
          />
        </div>
      </div>
      <RecentProducts productLoading={productLoading} />
    </div>
  );
};

export default Home;
