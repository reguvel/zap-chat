import { useEffect } from "react";
import NewDM from "./components/new-dm";
import ProfileInfo from "./components/profile-info";
import { GET_DM_CONTACTS_ROUTES } from "@/utils/constants";
import { apiClient } from "@/lib/api-client";
import { useAppStore } from "@/store";
import ContactList from "@/components/ui/contact-list";

const ContactsContainer = () => {
  const { setDirectMessagesContacts, directMessagesContacts } = useAppStore();
  useEffect(() => {
    const getContacts = async () => {
      const response = await apiClient.get(GET_DM_CONTACTS_ROUTES, {
        withCredentials: true,
      });
      if (response.data.contacts) {
        console.log(response.data.contacts);
        setDirectMessagesContacts(response.data.contacts);
      }
    };
    getContacts();
  }, []);

  return (
    <div
      className={`relative md:w-[35vw] lg:w-[30vw] xl:w-[20vw] bg-[#1b1c24] border-r-2 border-[#2f303b] w-full`}
    >
      <div className="pt-3">
        <Logo />
      </div>
      <div className="my-5">
        <div className="flex items-center justify-between pr-10">
          <Title text="Direct Messages" />
          <NewDM />
        </div>
      </div>
      <div className="max-h-[38vh] overflow-y-auto scrollbar-hidden">
        <ContactList contacts={directMessagesContacts} />
      </div>
      {/* <div className="my-5">
        <div className="flex items-center justify-between pr-10">
          <Title text="Channels" />
       
        </div>
      </div> */}
      <ProfileInfo />
    </div>
  );
};

const Logo = () => {
  return (
    <div className="flex p-3 justify-start items-center ">
      <svg width="1450" height="50" viewBox="0 0 1450 200" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_39_2)">
<path d="M45.2018 45.2018L0 90.4036L48.8107 139.214L71.0543 116.256L45.2018 90.4036L90.4036 45.2018H45.2018Z" fill="white"/>
<path d="M45.2018 45.2018L0 90.4036L48.8107 139.214L71.0543 116.256L45.2018 90.4036L90.4036 45.2018H45.2018Z" fill="url(#paint0_linear_39_2)"/>
<path d="M89.7564 120.538L60.5598 150.673H225.83L195.695 120.538H135.426L210.762 45.2018H165.561L90.2242 120.538H89.7564Z" fill="white"/>
<path d="M89.7564 120.538L60.5598 150.673H225.83L195.695 120.538H135.426L210.762 45.2018H165.561L90.2242 120.538H89.7564Z" fill="url(#paint1_linear_39_2)"/>
<path d="M52.5561 30.1345L82.5112 0H225.83L248.43 30.1345H52.5561Z" fill="white"/>
<path d="M52.5561 30.1345L82.5112 0H225.83L248.43 30.1345H52.5561Z" fill="url(#paint2_linear_39_2)"/>
<path d="M208.969 117.937L225.112 134.529L275.336 90.583L253.812 44.843H221.525L241.256 90.583L208.969 117.937Z" fill="white"/>
<path d="M208.969 117.937L225.112 134.529L275.336 90.583L253.812 44.843H221.525L241.256 90.583L208.969 117.937Z" fill="url(#paint3_linear_39_2)"/>
<path d="M215.695 200C186.637 193.901 150.224 162.332 147.982 148.43L210.314 144.395L226.009 150.673C210.314 161.435 196.861 166.368 215.695 200Z" fill="white"/>
<path d="M215.695 200C186.637 193.901 150.224 162.332 147.982 148.43L210.314 144.395L226.009 150.673C210.314 161.435 196.861 166.368 215.695 200Z" fill="url(#paint4_linear_39_2)"/>
<path d="M399.92 112.48H485.168L457.52 140H333.488L415.408 58.08H333.488L361.008 30.56H481.84L399.92 112.48ZM531.05 140L554.7 116.35H618.72L578.68 76.31L514.99 140H481.55L572.63 48.92C574.317 47.2333 576.333 46.39 578.68 46.39C581.027 46.39 583.043 47.2333 584.73 48.92L675.81 140H531.05ZM778.62 46.39C786.686 46.39 793.58 49.2867 799.3 55.08C805.02 60.8 807.88 67.6933 807.88 75.76C807.88 83.8267 805.02 90.72 799.3 96.44C793.58 102.16 786.686 105.02 778.62 105.02H701.18V140H677.42V81.37H778.62C780.16 81.37 781.48 80.82 782.58 79.72C783.68 78.62 784.23 77.3 784.23 75.76C784.23 74.22 783.68 72.9 782.58 71.8C781.48 70.6267 780.16 70.04 778.62 70.04H677.42L701.18 46.39H778.62ZM845.499 66.528C840.208 71.8187 837.563 78.176 837.563 85.6C837.563 92.9387 840.208 99.2533 845.499 104.544C850.79 109.835 857.147 112.48 864.571 112.48H961.851V140H864.571C854.672 140 845.542 137.568 837.179 132.704C828.816 127.84 822.203 121.227 817.339 112.864C812.475 104.501 810.043 95.4133 810.043 85.6C810.043 75.7867 812.475 66.6987 817.339 58.336C822.203 49.888 828.816 43.232 837.179 38.368C845.542 33.504 854.672 31.072 864.571 31.072H961.851L934.203 58.592H864.571C857.147 58.592 850.79 61.2373 845.499 66.528ZM1074.7 46.39H1098.35V140H1074.7V105.02H991.764V140H968.114V46.39H991.764V81.37H1074.7V46.39ZM1151.28 140L1174.93 116.35H1238.95L1198.91 76.31L1135.22 140H1101.78L1192.86 48.92C1194.55 47.2333 1196.56 46.39 1198.91 46.39C1201.26 46.39 1203.27 47.2333 1204.96 48.92L1296.04 140H1151.28ZM1297.96 46.39H1404.66V70.04H1351.31V140H1327.66V70.04H1274.31L1297.96 46.39Z" fill="white"/>
</g>
<defs>
<linearGradient id="paint0_linear_39_2" x1="0" y1="0" x2="374.621" y2="190.277" gradientUnits="userSpaceOnUse">
<stop stop-color="#BA93F9"/>
<stop offset="0.169805" stop-color="#B04FF0"/>
<stop offset="1" stop-color="#3303DF"/>
</linearGradient>
<linearGradient id="paint1_linear_39_2" x1="0" y1="0" x2="374.621" y2="190.277" gradientUnits="userSpaceOnUse">
<stop stop-color="#BA93F9"/>
<stop offset="0.169805" stop-color="#B04FF0"/>
<stop offset="1" stop-color="#3303DF"/>
</linearGradient>
<linearGradient id="paint2_linear_39_2" x1="0" y1="0" x2="374.621" y2="190.277" gradientUnits="userSpaceOnUse">
<stop stop-color="#BA93F9"/>
<stop offset="0.169805" stop-color="#B04FF0"/>
<stop offset="1" stop-color="#3303DF"/>
</linearGradient>
<linearGradient id="paint3_linear_39_2" x1="0" y1="0" x2="374.621" y2="190.277" gradientUnits="userSpaceOnUse">
<stop stop-color="#BA93F9"/>
<stop offset="0.169805" stop-color="#B04FF0"/>
<stop offset="1" stop-color="#3303DF"/>
</linearGradient>
<linearGradient id="paint4_linear_39_2" x1="0" y1="0" x2="374.621" y2="190.277" gradientUnits="userSpaceOnUse">
<stop stop-color="#BA93F9"/>
<stop offset="0.169805" stop-color="#B04FF0"/>
<stop offset="1" stop-color="#3303DF"/>
</linearGradient>
<clipPath id="clip0_39_2">
<rect width="1450" height="200" fill="white"/>
</clipPath>
</defs>
</svg>

    </div>
  );
};

const Title = ({ text }) => {
  return (
    <h6 className="uppercase tracking-widest text-neutral-400 pl-10 font-light text-opacity-90 text-sm">
      {text}
    </h6>
  );
};
export default ContactsContainer;
