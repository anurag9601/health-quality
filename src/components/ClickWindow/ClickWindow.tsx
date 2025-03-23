import { UserContext } from "@/context/userContext";
import Image from "next/image";
import React, { ChangeEvent, useEffect } from "react";
import { MdCancel } from "react-icons/md";

interface propsDataType {
  setImageClickWindowOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ClickWindow: React.FC<propsDataType> = ({ setImageClickWindowOpen }) => {
  const { user, setNotifications, setExpiryAlertProducts } =
    React.useContext(UserContext);

  const [productFrontImgFile, setProductFrontImgFile] =
    React.useState<File | null>(null);
  const [productBackImgFile, setProductBackImgFile] =
    React.useState<File | null>(null);
  const [productFrontImgPreviewURL, setProductFrontImgPreviewURL] =
    React.useState<string | null>(null);
  const [productBackImgPreviewURL, setProductBackImgPreviewURL] =
    React.useState<string | null>(null);

  const [selectedTab, setSelectedTab] = React.useState<string>("front");

  const [loading, setLoading] = React.useState<boolean>(false);

  function handleGenerateImgPreviewURL(file: File) {
    if (selectedTab === "front") {
      const imgPreviewURL = URL.createObjectURL(file);
      setProductFrontImgPreviewURL(imgPreviewURL);
    } else if (selectedTab === "back") {
      const imgPreviewURL = URL.createObjectURL(file);
      setProductBackImgPreviewURL(imgPreviewURL);
    }
  }

  const convertResponseDataToJSON = async (response: string) => {
    const cleanedResponse = response
      .trim()
      .replace(/^```json/, "")
      .replace(/^```/, "")
      .replace(/```$/, "");

    const realJson = await JSON.parse(cleanedResponse);
    return realJson;
  };

  async function handleSendFileToAI() {
    if (!productFrontImgFile && !productBackImgFile) {
      alert("Attach product image to proceed.");
      return;
    }

    setLoading(true);

    const data = new FormData();

    if (productFrontImgFile && productBackImgFile) {
      data.set("img1", productFrontImgFile);
      data.set("img2", productBackImgFile);
    } else if (productFrontImgFile) {
      data.set("img1", productFrontImgFile);
    } else if (productBackImgFile) {
      data.set("img2", productBackImgFile);
    }

    const request = await fetch("/api/expiry-alert-ai", {
      method: "POST",
      body: data,
    });

    const response = await request.json();

    if (response.success === true) {
      const realJson = await convertResponseDataToJSON(response.response);

      if (realJson.error) {
        alert(realJson.error);
        setProductFrontImgFile(null);
        setProductBackImgFile(null);
        setProductFrontImgPreviewURL(null);
        setProductBackImgPreviewURL(null);
        return;
      }

      if (user) {
        const data = {
          userEmail: user.email,
          productName: realJson.product_name,
          expiryDate: realJson.product_expiry_date,
          manufactureDate: realJson.product_manufacture_date,
        };

        const request = await fetch("/api/expiry-alert/add", {
          method: "POST",
          body: JSON.stringify(data),
        });

        const response = await request.json();

        if (response.addNotification) {
          setNotifications((prev) => [response.addNotification, ...prev]);

          setExpiryAlertProducts((prev) => [
            response.addExpiryAlertProduct,
            ...prev,
          ]);

          setImageClickWindowOpen(false);
        }
      }
    }

    setLoading(false);
  }

  return (
    <div className="h-full w-full bg-neutral-600 bg-opacity-50 fixed flex items-center justify-center font-head z-[1] pl-[0px] pr-[0px] sm:pl-[20%] sm:pr-[10%]">
      <div className="h-[97%] w-full bg-sky-100 rounded-lg flex flex-col p-[15px] gap-[5px]">
        <p className="font-head text-xs sm:text-sm bg-indigo-200 rounded-lg p-[10px]">
          Click an image of the front and back sides of the product to capture
          details such as the product name, expiry date, and manufacturing date.
          If all these details are visible in a single image, then one image is
          sufficient.
        </p>
        <div className="h-[78%] w-[100%] bg-indigo-200 rounded-lg mb-[5px] flex flex-col">
          <div
            className={`max-h-[83%] w-[100%] h-full p-[10px] flex items-center justify-center`}
          >
            {selectedTab === "front" ? (
              <>
                {productFrontImgPreviewURL ? (
                  <Image
                    src={productFrontImgPreviewURL}
                    alt=""
                    width={300}
                    height={300}
                    className="h-[100%] w-[100%] object-center object-scale-down overflow-hidden"
                  />
                ) : (
                  <label className="h-[100%] w-[100%] bg-indigo-400 rounded-lg cursor-pointer flex items-center justify-center p-[20%] text-center text-indigo-50 font-bold text-md sm:text-lg">
                    <p>
                      Click on the tab to capture an image of the{" "}
                      <span className="text-indigo-800">front side</span> of
                      your product.
                    </p>
                    <input
                      type="file"
                      capture="user"
                      accept="image/*"
                      className="invisible fixed"
                      onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        const file = e.target.files;
                        if (!file) return;
                        setProductFrontImgFile(file[0]);
                        handleGenerateImgPreviewURL(file[0]);
                      }}
                    />
                  </label>
                )}
              </>
            ) : (
              <>
                {productBackImgPreviewURL ? (
                  <Image
                    src={productBackImgPreviewURL}
                    alt=""
                    width={300}
                    height={300}
                    className="h-[100%] w-[100%] object-fill object-scale-down overflow-hidden"
                  />
                ) : (
                  <label className="h-[100%] w-[100%] bg-indigo-400 rounded-lg cursor-pointer flex items-center justify-center p-[20%] text-center text-indigo-50 font-bold text-md sm:text-lg">
                    <p>
                      Click on the tab to capture an image of the{" "}
                      <span className="text-indigo-800">back side</span> of your
                      product.
                    </p>
                    <input
                      type="file"
                      capture="user"
                      accept="image/*"
                      className="invisible fixed"
                      onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        const file = e.target.files;
                        if (!file) return;
                        setProductBackImgFile(file[0]);
                        handleGenerateImgPreviewURL(file[0]);
                      }}
                    />
                  </label>
                )}
              </>
            )}
          </div>
          <div className="flex-1 h-full w-full border-t-[1px] flex items-center justify-start gap-[8px] pl-[8px]">
            <div className="h-[60px] w-[60px] flex relative">
              {productFrontImgPreviewURL && (
                <div
                  className="absolute text-blue-50 inset-x-[41px] inset-y-[-3px] text-[22px] hover:text-orange-100 cursor-pointer"
                  onClick={() => {
                    setProductFrontImgFile(null);
                    setProductFrontImgPreviewURL(null);
                  }}
                >
                  <MdCancel />
                </div>
              )}
              {productFrontImgPreviewURL ? (
                <Image
                  src={productFrontImgPreviewURL}
                  alt=""
                  height={60}
                  width={60}
                  className="flex-1 rounded-lg object-center object-fill cursor-pointer"
                  onClick={() => setSelectedTab("front")}
                />
              ) : (
                <div
                  className="h-[60px] w-[60px] bg-indigo-400 rounded-md flex items-center justify-center cursor-pointer"
                  onClick={() => setSelectedTab("front")}
                >
                  Front
                </div>
              )}
            </div>
            <div className="h-[60px] w-[60px] flex relative">
              {productBackImgPreviewURL && (
                <div
                  className="absolute text-blue-50 inset-x-[41px] inset-y-[-3px] text-[22px] hover:text-orange-100 cursor-pointer"
                  onClick={() => {
                    setProductBackImgFile(null);
                    setProductBackImgPreviewURL(null);
                  }}
                >
                  <MdCancel />
                </div>
              )}
              {productBackImgPreviewURL ? (
                <Image
                  src={productBackImgPreviewURL}
                  alt=""
                  height={60}
                  width={60}
                  className="flex-1 rounded-lg object-center object-fill cursor-pointer"
                  onClick={() => setSelectedTab("back")}
                />
              ) : (
                <div
                  className="h-[60px] w-[60px] bg-indigo-400 rounded-md flex items-center justify-center cursor-pointer"
                  onClick={() => setSelectedTab("back")}
                >
                  Back
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="flex-1 flex items-center justify-end gap-[15px] sm:gap-[20px]">
          <button
            className={`pl-[20px] pr-[20px] pt-[5px] pb-[5px] rounded-lg text-lg border-dotted border-[2px] border-indigo-700 flex items-center justify-center ${
              loading
                ? "opacity-[.5]"
                : "hover:border-solid hover:border-indigo-500"
            }`}
            onClick={() => setImageClickWindowOpen(false)}
            disabled={loading}
          >
            Close
          </button>
          <button
            className={`bg-gradient-to-r from-blue-300 to-indigo-500 pt-[5px] pb-[5px] pl-[20px] pr-[20px] text-lg rounded-lg border-[1px] ${
              !loading && "hover:border-black"
            } transition-all duration-300 ease-in-out ${
              loading && "opacity-[.5]"
            }`}
            disabled={loading}
            onClick={handleSendFileToAI}
          >
            {loading ? (
              <div className="h-[20px] w-[20px] rounded-full border border-[3px] border-t-indigo-500 border-t-[3px] spin-animation mt-[4px] mb-[4px] ml-[5px] mr-[5px]"></div>
            ) : (
              "Upload"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClickWindow;
