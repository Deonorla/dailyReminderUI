import React from "react";
import { TbReload } from "react-icons/tb";
import { AiOutlineSearch } from "react-icons/ai";
import { useCookies } from "react-cookie";

const Header = () => {
  const [cookie, setCookie, removeCookie] = useCookies();
  const userEmail = cookie.Email;

  const signOut = () => {
    console.log("Signout");
    removeCookie("Email");
    removeCookie("AuthToken");
    window.location.reload();
  };

  return (
    <div className="bg-white fixed top-0 w-full flex justify-between border-b border-b-gray-200 p-4 z-10">
      <div className="p-3">
        <img src={`logo.png`} alt="" className="w-[7rem]" />
      </div>

      <div className=" md:flex w-[60%] hidden items-center ">
        <div className=" flex">
          <img className="mr-4 w-[2.7rem] h-12" src={`add-friend.png`} alt="" />
          <div className="flex flex-col">
            <p className="text-xl text-[#00537A] font-bold">Welcome Back</p>
            <p className="text-sm">{userEmail}</p>
          </div>
        </div>
        <div className="border-[1px] rounded-sm h-fit flex ml-[2rem] w-[40%] border-gray-300 bg-gray-200  pl-2 items-center">
          <AiOutlineSearch />
          <input
            placeholder="Search"
            type="text"
            className="border-[1px] ml-2 focus:outline-none w-[70%] placeholder:text-sm bg-gray-200 focus:border-transparent focus:ring-0 "
          />
        </div>
      </div>

      <div className="flex">
        <div className="flex flex-row items-center">
          {/* <TbReload className="text-2xl" /> */}
          <button
            className="ml-4
                  bg-[#b95252]
                  py-2 px-4 text-lg text-white rounded-[8px]
          "
            onClick={() => signOut()}
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
