import React, { useEffect, useRef, useState } from "react";
import { IoSendSharp } from "react-icons/io5";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useSelector } from "react-redux";
import axios from "axios";
import { FaCircle } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";

const ChatScreen = ({ index, onBack }) => {
  const { user } = useSelector((store) => store);
  const [data, setData] = useState([]);

  const [message, setMessage] = useState("");
  const messageRef = useRef(null);

  useEffect(() => {
    const fetchChats = async () => {
      const fetchData = await axios.post(
        `https://pocket-notes-backend-zeta.vercel.app/api/v1/message`,
        // "http://localhost:8000/api/v1/message",
        { user_id: user?._id }
      );
      setData(fetchData?.data?.data?.data);
    };
    fetchChats();
  }, [user]);

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSend = async () => {
    try {
      const fetchData = await axios.post(
        `https://pocket-notes-backend-zeta.vercel.app/api/v1/message/send`,
        // "http://localhost:8000/api/v1/message/send",
        { group_id: user?._id, message: message }
      );

      // Add the new message to the existing messages without refreshing
      setData((prevData) => [
        ...prevData,
        { text: message, createdAt: new Date().toISOString() },
      ]);

      // Clear the message input field after sending
      setMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const handleCloseButton = () => {
    onBack();
  };

  function formatTime(dateString) {
    const date = new Date(dateString);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedTime = `${hours % 12 || 12}:${minutes
      .toString()
      .padStart(2, "0")} ${ampm}`;

    return `${formattedTime}`;
  }

  function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { day: "numeric", month: "short", year: "numeric" };
    const formattedDate = date.toLocaleDateString("en-GB", options);

    return `${formattedDate}`;
  }

  return (
    <div className="h-screen w-full flex flex-col">
      {/* Upper Part */}
      <div className="bg-[#001F8B] w-full h-[70px] flex items-center fixed top-0 z-10">
        <div onClick={handleCloseButton} className="md:hidden block pl-1">
          <IoMdArrowRoundBack size={30} color="white" />
        </div>
        <div
          style={{ backgroundColor: user?.groupColor }}
          className="flex items-center w-[50px] h-[50px] rounded-full md:ml-4 justify-center"
        >
          <p className="text-white text-[25px] font-roboto text-center">
            {user?.groupIcon}
          </p>
        </div>
        <p className="text-white text-[25px] font-roboto pl-2 text-center">
          {user?.groupName}
        </p>
      </div>

      {/* Message Box */}
      <div className="flex-grow overflow-y-scroll mt-[70px] bg-[#DAE5F5] mb-[22vh]">
        {data &&
          data.map((e, i) => (
            <div
              key={i}
              className="bg-white font-roboto font-medium my-4 shadow-2xl shadow-gray-400 p-4 text-[16px] rounded-[5px] mx-4"
            >
              <div className="font-medium font-roboto">{e?.text}</div>
              <div className="flex pt-2 justify-end">
                <div className="font-semibold font-roboto pr-2">
                  {formatDate(e?.createdAt)}
                </div>
                <FaCircle className="mt-2" size={8} />
                <div className="font-semibold font-roboto pl-2">
                  {formatTime(e?.createdAt)}
                </div>
              </div>
            </div>
          ))}
      </div>

      {/* Lower Part */}
      <div className="bg-[#001F8B] w-full h-[22vh] flex items-center fixed bottom-0 z-10 p-2">
        <textarea
          className="w-[95vw] md:w-[74%] h-full p-2 resize-none rounded-[10px] placeholder-top-left focus:outline-none overflow-y-auto"
          placeholder="Enter your text here....."
          value={message}
          onChange={handleChange}
          ref={messageRef}
        />
        <IoSendSharp
          size={30}
          color={message ? "black" : "gray"}
          className="ml-2 cursor-pointer fixed right-[30px] bottom-4"
          onClick={handleSend} // Handle click to send
        />
      </div>
    </div>
  );
};

export default ChatScreen;
