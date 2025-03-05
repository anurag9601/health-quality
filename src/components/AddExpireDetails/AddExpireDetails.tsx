import React from "react";
import { RxCross2 } from "react-icons/rx";

interface propsDataType {
  setAddManuallyBoxOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddExpireDetails: React.FC<propsDataType> = ({
  setAddManuallyBoxOpen,
}) => {
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
          />
        </div>
        <div className="w-full">
          <p className="font-head text-lg">expiry date</p>
          <input
            type="date"
            className="w-full h-[40px] rounded-md bg-indigo-100 border-[1.5px] border-blue-700 outline-none pl-[15px] pr-[15px] text-md font-medium font-head"
          />
        </div>
        <div className="w-full">
          <p className="font-head text-lg">Manufacture date</p>
          <input
            type="date"
            className="w-full h-[40px] rounded-md bg-indigo-100 border-[1.5px] border-blue-700 outline-none font-head pl-[15px] pr-[15px] text-md font-medium"
          />
        </div>
        <div className="w-full">
          <button className="flex items-center justify-center gap-[10px] w-[80px] font-head mt-[25px] text-lg h-[35px] rounded-md float-right text-blue-50 bg-gradient-to-r from-blue-400 to-indigo-500">
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddExpireDetails;
