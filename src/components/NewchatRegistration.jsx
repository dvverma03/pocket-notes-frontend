import React, { useRef, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { groupIcon } from "../utils/GroupIcon";
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';

const NewChatRegistration = ({ handleClose }) => {
  const [color, setColor] = useState("");
  const [groupName, setGroupName] = useState("");
  const groupRef = useRef(null);

  const createGroup = async () => {
    if (!groupName) {
      toast.error("Group Name should not be empty");
      return;
    } else if (!color) {
      toast.error("Color must be selected.");
      return;
    }
  
    const Icon = groupIcon(groupName);
  
    try {
      const fetchData = await axios.post(
        `https://pocket-notes-backend-zeta.vercel.app/api/v1/group/create`,
        // "http://localhost:8000/api/v1/group/create",
        { groupName: groupName, groupIcon: Icon, groupColor: color }
      );
      if (fetchData) {
        toast.success("New group created successfully.");
        setTimeout(() => handleClose(), 1000); // Delay handleClose to ensure toast shows up
      }
    } catch (e) {
      console.error("Error:", e); // Debugging line
      toast.error(`Group name already exit`);
      setTimeout(() => handleClose(), 1000); // Delay handleClose to ensure toast shows up
    }
  };

  const handleCloseButton = () => {
    handleClose();
  };

  // Handle textarea change
  const handleChange = (e) => {
    setGroupName(e.target.value);
  };

  return (
    <div className="bg-white rounded-md shadow-lg">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="md:h-[300px] h-[200px] flex justify-center items-center w-[95vw] md:w-[600px]">
        <div className="md:h-[180px] md:w-[550px]">
          <div
            onClick={handleCloseButton}
            className="flex float-right cursor-pointer border-2 border-gray"
          >
            <RxCross2 size={25} />
          </div>
          <div className="md:text-[42px] text-[20px] pb-2 pt-[-10px] font-roboto font-medium">
            Create New Group
          </div>
          <div className="flex flex-row pb-4 items-center">
            <div className="md:text-[35px] text-[18px]  font-roboto  font-medium">
              Group Name
            </div>
            <div className="md:w-64 h-[35px] ml-6 mt-2">
              <input
                value={groupName}
                onChange={handleChange}
                ref={groupRef}
                className="w-full h-full rounded-[15px] font-roboto pl-2 focus:outline-none border-2 border-gray-300"
                type="text"
                placeholder="Enter group name"
              />
            </div>
          </div>
          <div className="flex items-center">
            <div className="md:text-[35px] text-[18px] font-roboto font-medium">
              Choose color
            </div>
            <div className="flex space-x-2 pl-2">
              
                <p
                  key={"#B38BFA"}
                  onClick={() => setColor("#B38BFA")}
                  className={`md:w-[30px] w-[20px] h-[20px] md:h-[30px] cursor-pointer rounded-full bg-[#B38BFA] ${
                    color === "#B38BFA" ? "border-2 border-black" : "border-0"
                  }`}
                ></p>
                <p
                  key={"#FF79F2"}
                  onClick={() => setColor("#FF79F2")}
                  className={`md:w-[30px] w-[20px] h-[20px] md:h-[30px] cursor-pointer rounded-full bg-[#FF79F2] ${
                    color === "#FF79F2" ? "border-2 border-black" : "border-0"
                  }`}
                ></p>
                <p
                  key={"#43E6FC"}
                  onClick={() => setColor("#43E6FC")}
                  className={`md:w-[30px] w-[20px] h-[20px] md:h-[30px] cursor-pointer rounded-full bg-[#43E6FC] ${
                    color === "#43E6FC" ? "border-2 border-black" : "border-0"
                  }`}
                ></p>
                <p
                  key={"#F19576"}
                  onClick={() => setColor("#F19576")}
                  className={`md:w-[30px] w-[20px] h-[20px] md:h-[30px] cursor-pointer rounded-full bg-[#F19576] ${
                    color === "#F19576" ? "border-2 border-black" : "border-0"
                  }`}
                ></p>
                <p
                  key={"#0047FF"}
                  onClick={() => setColor("#0047FF")}
                  className={`md:w-[30px] w-[20px] h-[20px] md:h-[30px] cursor-pointer rounded-full bg-[#0047FF] ${
                    color === "#0047FF" ? "border-2 border-black" : "border-0"
                  }`}
                ></p>
                <p
                  key={"#6691FF"}
                  onClick={() => setColor("#6691FF")}
                  className={`md:w-[30px] w-[20px] h-[20px] md:h-[30px] cursor-pointer rounded-full bg-[#6691FF] ${
                    color === "#6691FF" ? "border-2 border-black" : "border-0"
                  }`}
                ></p>
                
            </div>
          </div>
          <div
            onClick={createGroup}
            className="flex float-right pt-2 md:pb-4 cursor-pointer"
          >
            <div className="bg-[#001F8B] text-white font-roboto py-[4px] px-10 rounded-[8px]">
              Create
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewChatRegistration;