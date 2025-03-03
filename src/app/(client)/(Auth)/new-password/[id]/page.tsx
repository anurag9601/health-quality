"use client";
import NotFound from "@/app/not-found";
import AuthNav from "@/components/AuthNav/AuthNav";
import { notFound, useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { FormEvent, useEffect } from "react";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import z from "zod";

const NewPassword = () => {
  const { id } = useParams();

  const router = useRouter();

  const [pageLoading, setPageLoading] = React.useState<boolean>(true);

  const [loading, setLoading] = React.useState<boolean>(false);

  const [errors, setErrors] = React.useState<string[] | []>([]);

  const newPasswordRef = React.useRef<HTMLInputElement | null>(null);
  const confirmPasswordRef = React.useRef<HTMLInputElement | null>(null);
  const [showNewPassword, setShowNewPassword] = React.useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    React.useState<boolean>(false);

  const handleNewPasswordVisiblityClick = () => {
    setShowNewPassword((prev) => !prev);
  };

  const handleConfirmPasswordVisiblityClick = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  function clearErrors() {
    const timeOut = setTimeout(() => {
      setErrors([]);
      clearTimeout(timeOut);
    }, 2000);
  }

  const handleSetNewPassword = async (e: FormEvent) => {
    e.preventDefault();

    if (loading || !newPasswordRef.current || !confirmPasswordRef.current)
      return;

    const validPasswordDataCheck = z.object({
      newPassword: z.string().min(6),
      confirmPassword: z.string().min(6),
    });

    const newPassword = newPasswordRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;

    if (newPassword !== confirmPassword) {
      if (errors.length == 0) {
        const error = "Passwords are not same";
        setErrors((prev) => [...prev, error]);
        clearErrors();
      }
      return;
    }

    const data = {
      newPassword,
      confirmPassword,
    };

    const verify = validPasswordDataCheck.safeParse(data);

    if (verify.success) {
      setLoading(true);

      const request = await fetch(`/api/new-password/${id}`, {
        method: "POST",
        body: JSON.stringify({
          newPassword: verify.data.newPassword,
        }),
      });

      const respose = await request.json();

      if (respose.error) {
        notFound();
      } else if (respose.passwordError) {
        setErrors((prev) => [...prev, respose.passwordError]);
        clearErrors();
      } else if (respose.success === true) {
        router.push("/signin");
      }

      setLoading(false);
    } else if (verify.error) {
      if (errors.length == 0) {
        verify.error.errors.forEach((errorMessage) => {
          setErrors((prev) => [...prev, errorMessage.message]);
        });
        clearErrors();
      }
    }
  };

  const handleCheckValidLink = async () => {
    const request = await fetch("/api/new-password/valid", {
      method: "POST",
      body: JSON.stringify({
        id,
      }),
    });

    const respose = await request.json();

    if (respose.valid === true) {
      setPageLoading(false);
    } else if (respose.error) {
      setPageLoading(true);
    }
  };

  useEffect(() => {
    handleCheckValidLink();
  }, []);

  return (
    <>
      {pageLoading ? (
        <NotFound />
      ) : (
        <div className="h-full w-full bg-orange-50 flex flex-col">
          <AuthNav />
          <div className="flex flex-1 items-center justify-center">
            <form
              onSubmit={handleSetNewPassword}
              className="flex flex-col items-center max-w-[350px] w-full pl-[20px] pr-[20px]"
            >
              <h3 className="font-head text-xl">New password</h3>
              <p className="font-head text-md mb-[10px]">
                Let&apos;s get you a fresh, secure password.
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
              <div className="w-full">
                <p className="font-head text-sm text-amber-600">New password</p>
                <div className="w-full h-[40px] rounded-md bg-amber-100 border-[1.5px] border-amber-700 outline-none font-normal pl-[15px] pr-[15px] text-md font-medium mb-[10px] flex items-center">
                  <input
                    type={`${showNewPassword ? "text" : "password"}`}
                    ref={newPasswordRef}
                    className="h-full w-full bg-transparent border-none outline-none"
                  />
                  {showNewPassword ? (
                    <IoIosEyeOff
                      className="text-lg cursor-pointer"
                      onClick={handleNewPasswordVisiblityClick}
                    />
                  ) : (
                    <IoIosEye
                      className="text-xl cursor-pointer"
                      onClick={handleNewPasswordVisiblityClick}
                    />
                  )}
                </div>
              </div>
              <div className="w-full">
                <p className="font-head text-sm text-amber-600">
                  Confirm password
                </p>
                <div className="w-full h-[40px] rounded-md bg-amber-100 border-[1.5px] border-amber-700 outline-none font-normal pl-[15px] pr-[15px] text-md font-medium mb-[10px] flex items-center">
                  <input
                    type={`${showConfirmPassword ? "text" : "password"}`}
                    ref={confirmPasswordRef}
                    className="h-full w-full bg-transparent border-none outline-none"
                  />
                  {showConfirmPassword ? (
                    <IoIosEyeOff
                      className="text-lg cursor-pointer"
                      onClick={handleConfirmPasswordVisiblityClick}
                    />
                  ) : (
                    <IoIosEye
                      className="text-xl cursor-pointer"
                      onClick={handleConfirmPasswordVisiblityClick}
                    />
                  )}
                </div>
              </div>
              <button
                className={`flex items-center justify-center gap-[10px] w-full font-head mt-[6px] text-xl h-[40px] bg-rose-400 rounded-md ${
                  !loading && "hover:bg-rose-300"
                } ${loading && "opacity-[.5]"}`}
                type="submit"
              >
                {loading ? (
                  <div className="h-[20px] w-[20px] rounded-full border border-[3px] border-t-orange-500 border-t-[3px] spin-animation"></div>
                ) : (
                  `Submit`
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default NewPassword;
