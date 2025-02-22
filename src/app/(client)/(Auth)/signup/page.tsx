"use client";
import AuthNav from "@/components/AuthNav/AuthNav";
import { UserContext } from "@/context/userContext";
import { redirect, useRouter } from "next/navigation";
import React, { FormEvent, useContext, useEffect } from "react";
import { IoLogoGoogle } from "react-icons/io";
import z from "zod";

const SignUp = () => {
  const route = useRouter();

  const { user, setUser } = useContext(UserContext);

  const emailRef = React.useRef<HTMLInputElement | null>(null);
  const passwordRef = React.useRef<HTMLInputElement | null>(null);

  const [errors, setErrors] = React.useState<string[] | []>([]);

  function clearErrors() {
    const timeOut = setTimeout(() => {
      setErrors([]);
      clearTimeout(timeOut);
    }, 2000);
  }

  const handleUserSignUpFormSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!emailRef.current || !passwordRef.current) return;

    const data = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    const verifySignUpPayload = z.object({
      email: z.string().email(),
      password: z.string().min(6),
    });

    const verify = verifySignUpPayload.safeParse(data);

    if (verify.success) {
      const body = verify.data;

      const request = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const respose = await request.json();

      if (respose.data) {
        setUser(respose.data);
        redirect("/");
      } else if (respose.error) {
        setErrors((prev) => [...prev, respose.error]);
        clearErrors();
      }
    } else if (verify.error) {
      verify.error.errors.forEach((errorMessage) => {
        setErrors((prev) => [...prev, errorMessage.message]);
      });
      clearErrors();
    }
  };

  if (user) {
    redirect("/");
  }

  return (
    <div className="h-full w-full bg-orange-50 cursor-default flex flex-col items-center justify-center">
      <AuthNav />
      <form
        onSubmit={handleUserSignUpFormSubmit}
        className="h-full flex flex-col items-center justify-center max-w-[350px] w-full pl-[20px] pr-[20px]"
      >
        <h2 className="font-head text-2xl font-medium mb-[10px]">Sign Up</h2>
        <button
          className={`w-full font-head flex items-center justify-center gap-[15px] h-[40px] border-[1.5px] border-amber-500 text-amber-700 text-lg rounded-md ${
            errors.length == 0 && "hover:bg-orange-200"
          } transition-all duration-200 ease-in-out ${
            errors.length > 0 && "opacity-[30%]"
          }`}
          disabled={errors.length > 0}
        >
          <IoLogoGoogle className="text-[22px]" /> Continue with google
        </button>
        <h2 className="font-head text-xl font-medium mt-[10px]">Or</h2>
        {errors.length > 0 && (
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
        <div className="w-full">
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
        <button
          type="submit"
          className={`w-full font-head mt-[20px] text-xl h-[40px] bg-rose-400 rounded-md ${
            errors.length == 0 && "hover:bg-rose-300"
          } ${errors.length > 0 && "opacity-[30%]"}`}
          disabled={errors.length > 0}
        >
          Create
        </button>
        <p className="font-head mt-[5px] cursor-pointer text-md">
          Already have an account?{" "}
          <span
            className="text-orange-500 hover:text-orange-700"
            onClick={() => route.push("/signin")}
          >
            Sign in
          </span>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
