import React from "react";
import { FiSettings } from "react-icons/fi";
import { MdNotificationAdd, MdOutlineCalendarToday } from "react-icons/md";
import { NavLink } from "react-router-dom";

const SideBar = () => {
  return (
    <div className="fixed left-0 h-full border-r top-[11.5%] border-gray-200 w-[20%]">
      <div className="flex flex-col mt-8 items-center">
        <NavLink to="" style={{ textDecoration: "none" }} className="">
          {({ isActive }) => (
            <div
              className={
                isActive
                  ? "bg-[#F5A201] flex w-[12rem] my-2 px-4 py-2 h-fit rounded-[8px] items-center "
                  : " flex w-[10rem] px-4 py-2 my-2 h-fit rounded-[8px] items-center "
              }
            >
              <MdNotificationAdd
                className={
                  isActive ? "text-white text-xl" : "text-black text-xl"
                }
              />
              <p className={isActive ? "text-white ml-2" : "text-black ml-2"}>
                Reminder
              </p>
            </div>
          )}
        </NavLink>
        <NavLink to="" style={{ textDecoration: "none" }} className="">
          {({ isActive }) => (
            <div
              className={
                isActive
                  ? "bg-[#F5A201] flex w-[12rem] my-2 px-4 py-2 h-fit rounded-[8px] items-center "
                  : " flex w-[10rem] px-4 py-2 my-2 h-fit rounded-[8px] items-center "
              }
            >
              <MdOutlineCalendarToday
                className={
                  isActive ? "text-white text-xl" : "text-black text-xl"
                }
              />
              <p className={isActive ? "text-white ml-2" : "text-black ml-2"}>
                Calender
              </p>
            </div>
          )}
        </NavLink>
        <NavLink to="" style={{ textDecoration: "none" }} className="">
          {({ isActive }) => (
            <div
              className={
                isActive
                  ? "bg-[#F5A201] flex w-[12rem] my-2 px-4 py-2 h-fit rounded-[8px] items-center "
                  : " flex w-[10rem] px-4 py-2 my-2 h-fit rounded-[8px] items-center "
              }
            >
              <FiSettings
                className={
                  isActive ? "text-white text-xl" : "text-black text-xl"
                }
              />
              <p className={isActive ? "text-white ml-2" : "text-black ml-2"}>
                Settings
              </p>
            </div>
          )}
        </NavLink>
      </div>
    </div>
  );
};

export default SideBar;
