"use client";
import AuthNav from "@/components/AuthNav/AuthNav";
import { UserContext } from "@/context/userContext";
import React, { FormEvent, useContext } from "react";
import { CiCircleCheck } from "react-icons/ci";
import { FaLongArrowAltRight } from "react-icons/fa";
import { v4 as uuidv4 } from "uuid";
import z from "zod";

const ForgotPassword = () => {
  const { setResetPasswordId } = useContext(UserContext);

  const [emailSent, setEmailSent] = React.useState<boolean>(false);

  const [loading, setLoading] = React.useState<boolean>(false);

  const [errors, setErrors] = React.useState<string[] | []>([]);

  const emailRef = React.useRef<HTMLInputElement | null>(null);

  const sendCleanUp = () => {
    const emailSendInterval = setTimeout(() => {
      setEmailSent(false);
      clearInterval(emailSendInterval);
    }, 3000);
  };

  function clearErrors() {
    const timeOut = setTimeout(() => {
      setErrors([]);
      clearTimeout(timeOut);
    }, 2000);
  }

  const handleSendUserPasswordResetEmail = async (e: FormEvent) => {
    e.preventDefault();

    if (!emailRef.current || emailSent || loading) return;

    const uuid = uuidv4();

    setResetPasswordId(uuid);

    const data = {
      userEmail: emailRef.current.value,
      id: uuid,
    };

    const sendDataVerify = z.object({
      userEmail: z.string().email(),
      id: z.string(),
    });

    const verify = sendDataVerify.safeParse(data);

    if (verify.success) {
      setLoading(true);
      const body = verify.data;

      const request = await fetch("/api/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const respose = await request.json();

      setLoading(false);

      if (respose.success) {
        setEmailSent(true);
        sendCleanUp();
      } else if (!respose.success) {
        setErrors((prev) => [...prev, respose.error]);
        clearErrors();
      }
    } else if (verify.error) {
      if (errors.length == 0) {
        verify.error.errors.forEach((errorMessage) => {
          setErrors((prev) => [...prev, errorMessage.message]);
        });
        clearErrors();
      }
    }
  };

  return (
    <div className="h-full w-full bg-orange-50 flex flex-col">
      <AuthNav />
      <div className="flex flex-1 items-center justify-center">
        <form
          onSubmit={handleSendUserPasswordResetEmail}
          className="flex flex-col items-center max-w-[350px] w-full pl-[20px] pr-[20px]"
        >
          <h3 className="font-head text-xl">Reset password</h3>
          <p className="font-head text-md mb-[10px]">
            We&apos;tll email you a password reset link.
          </p>
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
          <input
            type="text"
            className="w-full h-[40px] rounded-md bg-amber-100 border-[1.5px] border-amber-700 outline-none font-normal pl-[15px] pr-[15px] text-md font-medium mb-[10px]"
            ref={emailRef}
          />
          {!emailSent ? (
            <button
              className="flex items-center justify-center gap-[10px] w-full font-head mt-[6px] text-xl h-[40px] bg-rose-400 rounded-md hover:bg-rose-300"
              type="submit"
            >
              {loading ? (
                <div className="h-[20px] w-[20px] rounded-full border border-[3px] border-t-orange-500 border-t-[3px] spin-animation"></div>
              ) : (
                `Start password reset`
              )}
              {!loading && <FaLongArrowAltRight />}
            </button>
          ) : (
            <button
              className="flex items-center justify-center gap-[10px] w-full font-head mt-[6px] text-xl h-[40px] bg-green-700 rounded-md text-emerald-50 cursor-not-allowed"
              type="button"
            >
              Email sent <CiCircleCheck className="text-lg" />
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
