import React, { useEffect } from "react";

const ClickWindow = () => {
  const videoRef = React.useRef<HTMLVideoElement | null>(null);
  async function handleGetUserMedia() {
    await navigator.mediaDevices
      .getUserMedia({ audio: false, video: true })
      .then((stream) => {
        videoRef.current!.srcObject = stream;
      });
  }
  useEffect(() => {
    // handleGetUserMedia();
  }, []);
  return (
    <div className="h-full w-full bg-neutral-600 bg-opacity-50 fixed flex items-center justify-center font-head z-[1] pl-[0px] pr-[0px] sm:pl-[20%] sm:pr-[20%] pt-[5px] pb-[5px]">
      <div className="h-full w-full bg-sky-100 rounded-lg flex flex-col p-[15px] gap-[5px]">
        <div className="flex items-start gap-[20px]">
          {/* <p className="font-head text-md bg-indigo-200 rounded-lg p-[10px]">
            Upload 1&#8208;2 product images showing the name, manufacturing, and
            expiry date one is enough if all details are visible!
          </p> */}
          <button className="bg-gradient-to-r from-blue-300 to-indigo-500 pt-[5px] pb-[5px] pl-[25px] pr-[25px] sm:text-[14px] lg:text-[17px] font-medium rounded-md border hover:border-black transition-all duration-300 ease-in-out">
            Close
          </button>
        </div>
        <video className="flex-1 h-full w-full rounded-lg" ref={videoRef} autoPlay muted playsInline/>
      </div>
    </div>
  );
};

export default ClickWindow;
