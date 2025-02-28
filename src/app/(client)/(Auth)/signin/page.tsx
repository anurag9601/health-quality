"use client";
import AuthNav from "@/components/AuthNav/AuthNav";
import { UserContext } from "@/context/userContext";
import { handleUserGoogleAuth } from "@/services/authProvider";
import { useRouter } from "next/navigation";
import React, { FormEvent, useContext } from "react";
import { IoLogoGoogle } from "react-icons/io";
import z from "zod";

const SignIn = () => {
  const route = useRouter();

  const { setUser } = useContext(UserContext);

  const emailRef = React.useRef<HTMLInputElement | null>(null);
  const passwordRef = React.useRef<HTMLInputElement | null>(null);

  const [errors, setErrors] = React.useState<string[] | []>([]);

  const [wait, setWait] = React.useState<boolean>(false);

  function clearErrors() {
    const timeOut = setTimeout(() => {
      setErrors([]);
      setWait(false);
      clearTimeout(timeOut);
    }, 2000);
  }

  const handleUserSignInFormSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!emailRef.current || !passwordRef.current) return;

    const data = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    setWait(true);

    const verifySignInPayload = z.object({
      email: z.string().email(),
      password: z.string(),
    });

    const verify = verifySignInPayload.safeParse(data);

    if (verify.success) {
      const body = verify.data;

      const request = await fetch("/api/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const respose = await request.json();

      if (respose.data) {
        setUser(respose.data);
        setWait(false);
        route.push("/");
      } else if (respose.error) {
        setErrors((prev) => [...prev, respose.error]);
        setWait(true);
        clearErrors();
      }
    } else if (verify.error) {
      verify.error.errors.forEach((errorMessage) => {
        setErrors((prev) => [...prev, errorMessage.message]);
      });
      setWait(true);
      clearErrors();
    }
  };

  return (
    <div className="h-full w-full bg-orange-50 cursor-default flex flex-col items-center justify-center">
      <AuthNav />
      <form
        onSubmit={handleUserSignInFormSubmit}
        className="h-full flex flex-col items-center justify-center max-w-[350px] w-full pl-[20px] pr-[20px]"
      >
        <h2 className="font-head text-2xl font-medium mb-[10px]">Sign In</h2>
        <div className="w-full">
          {wait && errors.length > 0 && (
            <div className="h-fit w-full mt-[5px] mb-[5px] flex flex-col gap-[10px]">
              {errors.map((errorMessage, index) => (
                <div
                  className={`min-h-35px w-full font-head text-md bg-red-300 pt-[5px] pb-[5px] pl-[10px] pr-[10px] rounded-md text-red-700 shadow-lg shadow-md shadow-red-500 slide-animation transition-all delay-${
                    index * 100
                  }`}
                  key={index}
                >
                  {errorMessage}
                </div>
              ))}
            </div>
          )}
          <p className="font-head text-lg">Email..</p>
          <input
            type="text"
            className="w-full h-[40px] rounded-md bg-amber-100 border-[1.5px] border-amber-700 outline-none font-normal pl-[15px] pr-[15px] text-md font-medium"
            ref={emailRef}
          />
        </div>
        <div className="w-full mt-[5px]">
          <p className="font-head text-lg">Password..</p>
          <input
            type="password"
            className="w-full h-[40px] rounded-md bg-amber-100 border-[1.5px] border-amber-700 outline-none font-normal pl-[15px] pr-[15px] text-md font-medium"
            ref={passwordRef}
          />
        </div>
        {/* <p className="text-[15px] font-head mt-[5px] cursor-pointer font-medium hover:underline">
          Forgot password?
        </p> */}
        <button
          type="submit"
          className={`w-full font-head mt-[20px] text-xl h-[40px] bg-rose-400 rounded-md ${
            !wait && "hover:bg-rose-300"
          } ${wait && "opacity-[30%]"}`}
          disabled={wait}
        >
          Sign in
        </button>
        <h2 className="font-head text-xl font-medium mt-[10px] mb-[10px]">
          Or
        </h2>
        <button
          className={`w-full font-head flex items-center justify-center gap-[15px] h-[40px] border-[1.5px] border-amber-500 text-amber-700 text-lg rounded-md ${
            !wait && "hover:bg-orange-200"
          } transition-all duration-200 ease-in-out ${wait && "opacity-[30%]"}`}
          disabled={wait}
          type="button"
          onClick={async () => {
            setWait(true);
            handleUserGoogleAuth();
          }}
        >
          <IoLogoGoogle className="text-[22px]" /> Continue with google
        </button>
        <p className="font-head mt-[5px] text-md">
          New here?{" "}
          <span
            className="text-orange-500 hover:text-orange-700 cursor-pointer"
            onClick={() => route.push("/signup")}
          >
            Sign up
          </span>
        </p>
      </form>
    </div>
  );
};

export default SignIn;
