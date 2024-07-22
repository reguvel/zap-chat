import { useAppStore } from "@/store";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import ContactsContainer from "./componenets/contacts-container";
import EmptyChatContainer from "./componenets/empty-chat-container";
import ChatContainer from "./componenets/chat-container";

const Chat = () => {
  const{userInfo}=useAppStore();
  const navigate=useNavigate();
  useEffect(()=>{
    if(!userInfo.profileSetup){
      toast("please setup profile to continue.");
      navigate("/profile");
    }
  },[userInfo,navigate]);
  return (
    <div className="flex h-[100vh] text-white overflow-hidden">
      <ContactsContainer />
      {/* <EmptyChatContainer /> */}
      <ChatContainer />
      
    </div>
  );
};
export default Chat;