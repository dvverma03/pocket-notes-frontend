import { useState } from "react";
import Sidebar from "./components/Sidebar";
import HomeScreen from "./components/HomeScreen";
import ChatScreen from "./components/ChatScreen";
import NewChatRegistration from "./components/NewchatRegistration";

function App() {
  const [isChat, setIsChat] = useState(false);
  const [userIndex, setUserIndex] = useState(null);
  const [newGroup, setNewGroup] = useState(false);
  const [showHome, setShowHome] = useState(true);

  const screenHandle = () => {
    setIsChat(true);
    setShowHome(false);
  };

  const handleBackToSidebar = () => {
    setIsChat(false);
  };

  const handleNewGroup = () => {
    setNewGroup(!newGroup);
  };

  return (
    <div className="relative md:flex overflow-y-scroll no-scrollbar md:flex-row">
      {/* Sidebar and Main Content */}
      <div
        className={`w-screen md:w-1/4 h-screen ${newGroup ? "blur-sm" : ""} ${
          isChat ? "hidden md:block" : ""
        }`} // Hide Sidebar on small screens when Chat is open
      >
        <div className="text-3xl font-medium font-roboto text-center pt-[3vh] pb-[3vh]">
          Pocket Notes
        </div>
        <div
          className="h-screen w-full overflow-y-scroll no-scrollbar"
          style={{ height: "calc(100vh - 11vh)" }}
        >
          <Sidebar
            screenHandle={screenHandle}
            setUserIndex={setUserIndex}
            handleNewGroup={handleNewGroup}
          />
        </div>
      </div>

      {/* HomeScreen or ChatScreen */}
      <div className={`w-full md:w-3/4 ${newGroup ? "blur-sm" : ""}`}>
        {isChat ? (
          <ChatScreen index={userIndex} onBack={handleBackToSidebar} />
        ) : (
          <div className="hidden md:block">
            <HomeScreen />
          </div>
        )}
      </div>

      {/* New Chat Registration Overlay */}
      {newGroup && (
        <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
          <NewChatRegistration handleClose={handleNewGroup} />
        </div>
      )}
    </div>
  );
}

export default App;
