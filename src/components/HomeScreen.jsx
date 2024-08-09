import React from "react";
import HomeScreenImage from "../assets/home.svg";
import { IoMdLock } from "react-icons/io";

const HomeScreen = () => {
  return (
    <div className="w-full h-screen bg-[#dae5f5]">
      <div className="flex w-full justify-center pt-[10vh] items-center">
        <img
          className="justify-center items-center w-[40vw]"
          src={HomeScreenImage}
          alt=""
          srcset=""
        />
      </div>
      <div className="text-4xl font-bold font-roboto text-center">
        Pocket Notes
      </div>
      <div className="justify-center items-center flex w-full ">
        <div className="text-[16px] font-medium font-roboto w-[50%] pt-4 lh-20">
          Send and receive messages without keeping your phone online. Use
          Pocket Notes on up to 4 linked devices and 1 mobile phone
        </div>
      </div>
      <div className="flex flex-row justify-center pt-[25vh] font-medium">
        <IoMdLock className="mt-1" />
        <div className="font-roboto">end-to-end encrypted</div>
      </div>
    </div>
  );
};

export default HomeScreen;
