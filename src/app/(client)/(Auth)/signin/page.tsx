import AuthNav from "@/components/AuthNav/AuthNav";
import React from "react";
import { IoLogoGoogle } from "react-icons/io";

const SignIn = () => {
  return (
    <div className="h-full w-full bg-orange-50 cursor-default flex flex-col items-center justify-center">
      <AuthNav />
      <form className="h-full flex flex-col items-center justify-center max-w-[350px] w-full pl-[20px] pr-[20px]">
        <h2 className="font-head text-2xl font-medium mb-[10px]">Sign In</h2>
        <div className="w-full">
          <p className="font-head text-lg">Email..</p>
          <input
            type="text"
            className="w-full h-[40px] rounded-md bg-amber-100 border-[1.5px] border-amber-700 outline-none font-normal pl-[15px] pr-[15px] text-md font-medium"
          />
        </div>
        <div className="w-full mt-[5px]">
          <p className="font-head text-lg">Password..</p>
          <input
            type="password"
            className="w-full h-[40px] rounded-md bg-amber-100 border-[1.5px] border-amber-700 outline-none font-normal pl-[15px] pr-[15px] text-md font-medium"
          />
        </div>
        <p className="text-[15px] font-head mt-[5px] cursor-pointer font-medium hover:underline">Forgot password?</p>
        <button 
          type="submit"
          className="w-full font-head mt-[15px] text-xl h-[40px] bg-rose-400 rounded-md hover:bg-rose-300"
        >
          Sign in
        </button>
        <h2 className="font-head text-xl font-medium mt-[10px] mb-[10px]">Or</h2>
        <button className="w-full font-head flex items-center justify-center gap-[15px] h-[40px] border-[1.5px] border-amber-500 text-amber-700 text-lg rounded-md hover:bg-orange-200 transition-all duration-200 ease-in-out">
          <IoLogoGoogle className="text-[22px]" /> Continue with google
        </button>
      </form>
    </div>
  );
};

export default SignIn;
