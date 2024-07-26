import { useAppStore } from "@/store";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { colors, getColor } from "@/lib/utils";
import { FaPlus, FaTrash } from "react-icons/fa";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { apiClient } from "@/lib/api-client";
import {
  ADD_PROFILE_IMAGE_ROUTE,
  HOST,
  REMOVE_PROFILE_IMAGE_ROUTE,
  UPDATE_PROFILE_ROUTE,
} from "@/utils/constants";

const Profile = () => {
  const navigate = useNavigate();
  const { userInfo, setUserInfo } = useAppStore();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [image, setImage] = useState(null);
  const [hovered, setHovered] = useState(false);
  const [selectedColor, setSelectedColor] = useState(0);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (userInfo.profileSetup) {
      setFirstName(userInfo.firstName);
      setLastName(userInfo.lastName);
      setSelectedColor(userInfo.color);
    }
    if (userInfo.image) {
      setImage(`${HOST}/${userInfo.image}`);
    }
  }, [userInfo]);

  const validateProfile = () => {
    if (!firstName) {
      toast.error("First Name is required");
      return false;
    }
    if (!lastName) {
      toast.error("Last Name is required");
      return false;
    }
    return true;
  };

  const saveChanges = async () => {
    if (validateProfile()) {
      try {
        const response = await apiClient.post(
          UPDATE_PROFILE_ROUTE,
          { firstName, lastName, color: selectedColor },
          { withCredentials: true }
        );
        if (response.status === 200 && response.data) {
          setUserInfo({ ...response.data });
          toast.success("Profile Updated Successfully!");

          navigate("/chat");
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleNavigate = () => {
    if (userInfo.profileSetup) {
      navigate("/chat");
    } else {
      toast.error("Please setup profile");
    }
  };

  const handleFileInputClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    console.log({ file });
    if (file) {
      //console.log("Yes file is there");
      const formData = new FormData();
      formData.append("profile-image", file);
      const response = await apiClient.post(ADD_PROFILE_IMAGE_ROUTE, formData, {
        withCredentials: true,
      });
      console.log("Hi" + response.data);
      if (response.status === 200 && response.data.image) {
        setUserInfo({ ...userInfo, image: response.data.image });
        setImage(`${HOST}/${response.data.image}`);
        toast.success("Image updated successfully");
      }
      // const reader = new FileReader();
      // reader.onload = () => {
      //   setImage(reader.result);
      // };
      // reader.readAsDataURL(file);
    }
  };

  const handleDeleteImage = async () => {
    try {
      const response = await apiClient.delete(REMOVE_PROFILE_IMAGE_ROUTE, {
        withCredentials: true,
      });
      if (response.status === 200) {
        setUserInfo({ ...userInfo, image: null });
        setImage(null);
        toast.success("Image removed successfully");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="bg-[#1b1c24] h-[100vh] flex items-center justify-center flex-col gap-10">
      <div className="flex flex-col gap-10 w-[80vw] md:w-max">
        <div onClick={handleNavigate}>
          <IoArrowBack className="text-4xl lg:text-6xl text-white/90 cursor-pointer" />
        </div>
        <div className="grid grid-cols-2">
          <div
            className="h-full w-32 md:w-48 relative flex items-center
           justify-center"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            <Avatar className="h-32 w32 md:w-48 md:h-48 rounded-full overflow-hidden">
              {image ? (
                <AvatarImage
                  src={image}
                  alt="profile"
                  className="object-cover w-full h-full bg-black"
                />
              ) : (
                <div
                  className={`uppercase h-32 w-32 md:w-48 md:h-48 text-5xl border-[1px] flex items-center justify-center rounded-full ${getColor(
                    selectedColor
                  )}`}
                >
                  {firstName
                    ? firstName.charAt(0)  //shift()
                    : userInfo.email.charAt(0) }
                </div>
              )}
            </Avatar>
            {hovered && (
              <div
                className="absolute insert-0 h-32 w-32 md:w-48 md:h-48 flex items-center justify-center bg-black/50 ring-fuchsia-50 rounded-full cursor-pointer"
                onClick={image ? handleDeleteImage : handleFileInputClick}
              >
                {image ? (
                  <FaTrash className="text-white text-3xl cursor-pointer" />
                ) : (
                  <FaPlus className="text-white text-3xl cursor-pointer" />
                )}
              </div>
            )}
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              onChange={handleImageChange}
              name="profile-image"
              accept=".png, .jpg, .jpeg, .svg, .webp"
            />
          </div>
          <div className="flex min-w-32 md:min-w-64 flex-col gap-5 text-white items-center justify-center">
            <div className="w-full">
              <Input
                placeholder="Email"
                type="email"
                disabled
                value={userInfo.email}
                className="rounded-lg p-6 bg-[#2c2e3b] border-none"
              />
            </div>
            <div className="w-full">
              <Input
                placeholder="First Name"
                onChange={(e) => setFirstName(e.target.value)}
                type="text"
                value={firstName}
                className="rounded-lg p-6 bg-[#2c2e3b] border-none"
              />
            </div>
            <div className="w-full">
              <Input
                placeholder="Last Name"
                onChange={(e) => setLastName(e.target.value)}
                type="text"
                value={lastName}
                className="rounded-lg p-6 bg-[#2c2e3b] border-none"
              />
            </div>
            <div className="w-full flex gap-5">
              {colors.map((color, index) => (
                <div
                  className={`${color} h-8 w-8 rounded-full cursor-pointer transition-all duration-300
                ${selectedColor === index ? "outline outline-white/50 " : ""}
                  `}
                  key={index}
                  onClick={() => setSelectedColor(index)}
                ></div>
              ))}
            </div>
          </div>
        </div>
        <div className=" w-full">
          <Button
            className="h-16 w-full bg-purple-700 hover:bg-purple-900 transition-all duration-300"
            onClick={saveChanges}
          >
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
};

// return (
//   <div className="bg-[151515] bg-opacity-15">
//     <div className="min-h-screen flex items-center justify-center" style={{ backgroundImage: `url(${Background})`, backgroundSize: '1500px' }}>
//       <div className="flex flex-col gap-8 w-[90vw] md:w-[40vw] lg:w-[30vw] p-8 bg-[#151515] shadow-2xl shadow-[#0f0f0f] rounded-lg opacity-85 backdrop-blur-lg">
//         <div className="text-center text-white">
//           <h1 className="text-3xl">Hello {firstName} {lastName}!</h1>
//         </div>
//         <div className="flex flex-col items-center gap-6">
//           <div
//             className="relative flex items-center justify-center"
//             onMouseEnter={() => setHovered(true)}
//             onMouseLeave={() => setHovered(false)}
//           >
//             <Avatar className="h-24 w-24 md:w-32 md:h-32 rounded-full overflow-hidden">
//               {image ? (
//                 <AvatarImage
//                   src={image}
//                   alt="profile"
//                   className="object-cover w-full h-full bg-black"
//                 />
//               ) : (
//                 <div
//                   className={`uppercase h-24 w-24 md:w-32 md:h-32 text-3xl border-[1px] flex items-center justify-center rounded-full ${getColor(selectedColor)}`}
//                 >
//                   {firstName ? firstName.charAt(0) : userInfo.email.charAt(0)}
//                 </div>
//               )}
//             </Avatar>
//             {hovered && (
//               <div
//                 className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full"
//                 onClick={image ? handleDeleteImage : handleFileInputClick}
//               >
//                 {image ? (
//                   <FaTrash className="text-white text-3xl cursor-pointer" />
//                 ) : (
//                   <FaPlus className="text-white text-3xl cursor-pointer" />
//                 )}
//               </div>
//             )}
//             <input
//               type="file"
//               ref={fileInputRef}
//               className="hidden"
//               onChange={handleImageChange}
//               name="profile-image"
//               accept=".png, .jpg, .jpeg, .svg, .webp"
//             />
//           </div>
//           <div className="grid grid-cols-4 gap-4">
//             {colors.map((color, index) => (
//               <div
//                 className={`${color} h-8 w-8 rounded-full cursor-pointer transition-all duration-300 ${selectedColor === index ? "outline outline-white/75 outline-2" : ""}`}
//                 key={index}
//                 onClick={() => setSelectedColor(index)}
//               ></div>
//             ))}
//           </div>
//         </div>
//         <div className="flex flex-col gap-4 text-white">
//           <Input
//             placeholder="Email"
//             type="email"
//             disabled
//             value={userInfo.email}
//             className="rounded-lg p-4 bg-[#292929] font-semibold border-none text-white"
//           />
//           <Input
//             placeholder="First Name"
//             type="text"
//             onChange={(e) => setFirstName(e.target.value)}
//             value={firstName}
//             className="rounded-lg p-4 bg-[#2d2d2d] font-semibold border-none text-white"
//           />
//           <Input
//             placeholder="Last Name"
//             type="text"
//             onChange={(e) => setLastName(e.target.value)}
//             value={lastName}
//             className="rounded-lg p-4 bg-[#2d2d2d] font-semibold border-none text-white"
//           />
//         </div>
//         <div className="flex items-center justify-between">
//           <div onClick={handleNavigate} className="h-12 p-3 items-center rounded-md mr-4 bg-[#32CD32] hover:bg-[#197419] transition-all duration-300">
//             <IoArrowBack className="text-2xl text-black hover:text-white transition-all duration-300 cursor-pointer" />
//           </div>
//           <Button
//             className="h-12 w-full bg-[#32CD32] hover:bg-[#197419] text-black hover:text-white transition-all duration-300"
//             onClick={saveChanges}
//           >
//             Save Changes
//           </Button>
//         </div>
//       </div>
//     </div>
//   </div>
// );
// };
export default Profile;
