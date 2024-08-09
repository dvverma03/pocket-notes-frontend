import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addUsers } from "../store/userSlice";

const Sidebar = ({screenHandle,setUserIndex,handleNewGroup}) => {
  const [selectedIndex, setSelectedIndex] = useState(null); 
  const [data,setData]=useState("")
  const [selectedUser,setSelectedUser]=useState()
  const dispatch=useDispatch()

  useEffect(()=>{
    const fetchChats=async()=>{
      const fetchData=await axios.get(`https://pocket-notes-backend-zeta.vercel.app/api/v1/group`)
      // const fetchData=await axios.get("http://localhost:8000/api/v1/group")
      setData(fetchData?.data?.data?.data)
    }
    fetchChats()
  },[data])

  const handleClick = (index) => {
    screenHandle();
    setSelectedIndex(index);
    setSelectedUser(data[index])
    dispatch(addUsers(data[index]))
    setUserIndex(index)
  };

  const handleNewGroupButton=()=>{
    handleNewGroup()
  }

  return (
    <>
      <div>
        {data && data?.map((e, i) => (
          <div
            key={i}
            className="flex flex-row p-4 mx-1 rounded-[5px] font-roboto pl-6 items-center cursor-pointer"
            onClick={() => handleClick(i)} 
            style={{
              backgroundColor: selectedIndex === i ? "#dcdcdc" : "transparent",
            }} 
          >
            <div style={{backgroundColor:e.groupColor}} className="flex items-center w-[50px] h-[50px] rounded-full ml-4 justify-center">
          <p  className="text-white font-roboto text-[25px] text-center">{e.groupIcon}</p>
        </div>
            <div className="text-2xl font-roboto pl-8">{e.groupName}</div>
          </div>
        ))}
      </div>
      <div onClick={handleNewGroupButton} className="text-4xl fixed bottom-4 left-[80%] md:left-[20%] bg-blue-700 w-[50px] h-[50px] rounded-full text-center text-white cursor-pointer">
        +
      </div>
    </>
  );
};

export default Sidebar;
