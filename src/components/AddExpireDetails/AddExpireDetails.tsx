import { UserContext } from "@/context/userContext";
import React from "react";
import { RxCross2 } from "react-icons/rx";

interface propsDataType {
  setAddManuallyBoxOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddExpireDetails: React.FC<propsDataType> = ({
  setAddManuallyBoxOpen,
}) => {
  const { user, setExpiryAlertProducts, setNotifications } =
    React.useContext(UserContext);

  const productNameRef = React.useRef<HTMLInputElement | null>(null);
  const productExpiryRef = React.useRef<HTMLInputElement | null>(null);
  const productManufactureRef = React.useRef<HTMLInputElement | null>(null);

  const [loading, setLoading] = React.useState<boolean>(false);

  function checkValidDates(expiryDate: string, manufactureDate: string) {
    const expiry = new Date(expiryDate).getTime();
    const manufacture = new Date(manufactureDate).getTime();

    if (manufacture > expiry) {
      return false;
    }

    return true;
  }

  async function handleAddExpiryProductInDB() {
    if (
      !productNameRef.current ||
      !productExpiryRef.current ||
      !productManufactureRef.current
    )
      return;

    const productName = productNameRef.current.value;
    const expiryDate = productExpiryRef.current.value;
    const manufactureDate = productManufactureRef.current.value;

    if (productName == "" || expiryDate == "" || manufactureDate == "") {
      alert("Fill all the fields.");
      return;
    }

    const isValidDates = checkValidDates(expiryDate, manufactureDate);

    if (!isValidDates) {
      alert(
        "The provided dates are invalid. The manufacturing date cannot be in the future relative to the expiry date. Please review and correct the dates accordingly."
      );

      return;
    }

    if (user) {
      setLoading(true);
      const request = await fetch("/api/expiry-alert/add", {
        method: "POST",
        body: JSON.stringify({
          userEmail: user.email,
          productName,
          expiryDate,
          manufactureDate,
        }),
      });

      const response = await request.json();

      if (response.addExpiryAlertProduct) {
        setNotifications((prev) => [response.addNotification, ...prev]);

        setExpiryAlertProducts((prev) => [
          response.addExpiryAlertProduct,
          ...prev,
        ]);
      }
    }
    setAddManuallyBoxOpen(false);
    setLoading(false);
  }

  return (
    <div className="h-full w-full fixed rounded-lg z-[1] bg-neutral-600 bg-opacity-50 pl-[20px] pr-[20px] flex items-center justify-center">
      <div className="h-fit max-w-[400px] w-full bg-indigo-200 rounded-lg p-[15px] flex flex-col items-center">
        <div className="w-full" onClick={() => setAddManuallyBoxOpen(false)}>
          <RxCross2 className="float-right text-lg text-indigo-700 cursor-pointer hover:text-indigo-900" />
        </div>
        <div className="w-full">
          <p className="font-head text-lg">Product name</p>
          <input
            type="text"
            className="w-full h-[40px] rounded-md bg-indigo-100 border-[1.5px] border-blue-700 outline-none font-normal pl-[15px] pr-[15px] text-md font-medium"
            ref={productNameRef}
          />
        </div>
        <div className="w-full">
          <p className="font-head text-lg">expiry date</p>
          <input
            type="date"
            className="w-full h-[40px] rounded-md bg-indigo-100 border-[1.5px] border-blue-700 outline-none pl-[15px] pr-[15px] text-md font-medium font-head"
            ref={productExpiryRef}
          />
        </div>
        <div className="w-full">
          <p className="font-head text-lg">Manufacture date</p>
          <input
            type="date"
            className="w-full h-[40px] rounded-md bg-indigo-100 border-[1.5px] border-blue-700 outline-none font-head pl-[15px] pr-[15px] text-md font-medium"
            ref={productManufactureRef}
          />
        </div>
        <div className="w-full">
          <button
            className={`flex items-center justify-center gap-[10px] w-[80px] font-head mt-[25px] text-lg h-[35px] rounded-md float-right text-blue-50 bg-gradient-to-r from-blue-400 to-indigo-500 ${
              !loading && "hover:border-[1px] border-black"
            } ${loading && "opacity-[.5]"}`}
            disabled={loading}
            onClick={handleAddExpiryProductInDB}
          >
            {loading ? (
              <div className="h-[20px] w-[20px] rounded-full border border-[3px] border-t-indigo-500 border-t-[3px] spin-animation mt-[4px] mb-[4px] ml-[5px] mr-[5px]"></div>
            ) : (
              "Add"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddExpireDetails;
