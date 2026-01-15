/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { FaBell } from "react-icons/fa6";
import { IoSettingsOutline } from "react-icons/io5";
import { TbCopy } from "react-icons/tb";
import { FaAngleDown } from "react-icons/fa6";
import { useSelector } from "react-redux";
import axios from "axios";
import { DB_URL } from "../../utils";
import JoinedUsersPopUp from "./JoinedUsersPopUp";
import toast from "react-hot-toast";

const Header = ({
  currentPage,
  setlanguage,
  settheme,
  setactiveUsersPopUpOpen,
  roomData,
  allJoindedUsers,
  activeUsersPopUpOpen,
  handleKickUser,
}) => {
  const { user } = useSelector((state) => state.user);
  const [allUsersData, setallUsersData] = useState([]);

  useEffect(() => {
    if (!allJoindedUsers.length || !activeUsersPopUpOpen) return;

    const userIds = allJoindedUsers.map((usr) => usr.userId);
    // /get-user-by-ids

    const getUsersDataByIds = async () => {
      const res = await axios.post(DB_URL + "/user/get-user-by-ids", {
        userIds,
      });

      setallUsersData(res.data.users);
    };

    getUsersDataByIds();
  }, [allJoindedUsers, activeUsersPopUpOpen]);

  return (
    <>
      {activeUsersPopUpOpen && (
        <JoinedUsersPopUp
          handleKickUser={handleKickUser}
          roomData={roomData}
          allUsersData={allUsersData}
          setactiveUsersPopUpOpen={setactiveUsersPopUpOpen}
        ></JoinedUsersPopUp>
      )}
      <div className=" p-4 bg-dark-navy items-center flex justify-between  ">
        <div className="flex gap-2 items-center">
          <img className="h-10 w-10 " src="/public/ai.gif" alt="" />
          <div>
            <p className="font-bold text-purple-500">
              {roomData?.sessionInfo?.title}
            </p>
            <p className="text-gray-300 gap-2 flex  items-center leading-4 text-sm">
              <span>Room ID: </span>
              <span className="text-blue-300"> {roomData?.roomId} </span>
              <TbCopy
                onClick={async () => {
                  await navigator.clipboard.writeText(roomData?.roomId);
                  toast.success("Copy sucessfully!");
                }}
                title="Copy"
                className=" hover:scale-110 cursor-pointer "
              ></TbCopy>
            </p>
          </div>
        </div>
        {currentPage == "editor" && (
          <div className="flex gap-5 items-center">
            <select
              onChange={(e) => setlanguage(e.target.value)}
              className="bg-dark-navy text-white outline-none font-mono"
              name=""
              id=""
            >
              {monacoLanguages.map((l) => (
                <option selected={l == "javascript"} value={l}>
                  {l}
                </option>
              ))}
            </select>
            <select
              onChange={(e) => settheme(e.target.value)}
              className="bg-dark-navy text-white outline-none font-mono"
              name=""
              id=""
            >
              {monacoThemes.map((l) => (
                <option selected={l == "vs-dark"} value={l}>
                  {l}
                </option>
              ))}
            </select>
          </div>
        )}

        <div className="flex gap-6  items-center">
          <div
            onClick={() => setactiveUsersPopUpOpen(true)}
            className="flex  mr-10 translate-x-10 text-white hover:text-purple-500 relative items-center cursor-pointer "
          >
            <div className="  h-8 w-8 rounded-full ">
              <img
                className="h-full w-full rounded-full"
                src="data:image/png;base64,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"
                alt=""
              />
            </div>
            <div className=" -translate-x-4  h-8 w-8 rounded-full ">
              <img
                className="h-full w-full rounded-full"
                src="data:image/jpeg;base64,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"
                alt=""
              />
            </div>
            <div className=" -translate-x-8  h-8 w-8 rounded-full ">
              <img
                className="h-full w-full rounded-full"
                src="data:image/jpeg;base64,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"
                alt=""
              />
            </div>
            <div className="  -translate-x-12  h-8 w-8 rounded-full ">
              <img
                className="h-full w-full rounded-full"
                src="data:image/png;base64,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"
                alt=""
              />
            </div>

            <FaAngleDown className="   -translate-x-10 text-lg"></FaAngleDown>
          </div>
          {/* <FaBell className="text-2xl text-gray-500"></FaBell>
          <IoSettingsOutline className="text-2xl text-gray-500"></IoSettingsOutline> */}
        </div>
      </div>
    </>
  );
};

export default Header;

const monacoLanguages = [
  "abap",
  "aes",
  "apex",
  "azcli",
  "bat",
  "bicep",
  "cameligo",
  "clojure",
  "coffee",
  "cpp",
  "csharp",
  "csp",
  "css",
  "cypher",
  "dart",
  "dockerfile",
  "ecl",
  "elixir",
  "flow9",
  "fsharp",
  "go",
  "graphql",
  "handlebars",
  "hcl",
  "html",
  "ini",
  "java",
  "javascript",
  "julia",
  "kotlin",
  "less",
  "lexon",
  "lua",
  "liquid",
  "m3",
  "markdown",
  "mdx",
  "mips",
  "msdax",
  "mysql",
  "objective-c",
  "pascal",
  "pascaligo",
  "perl",
  "pgsql",
  "php",
  "pla",
  "plaintext",
  "postiats",
  "powerquery",
  "powershell",
  "protobuf",
  "pug",
  "python",
  "qsharp",
  "r",
  "razor",
  "redis",
  "redshift",
  "restructuredtext",
  "ruby",
  "rust",
  "sb",
  "scala",
  "scheme",
  "scss",
  "shell",
  "solidity",
  "sophia",
  "sparql",
  "sql",
  "st",
  "swift",
  "systemverilog",
  "tcl",
  "twig",
  "typescript",
  "vb",
  "verilog",
  "xml",
  "yaml",
];

const monacoThemes = [
  "vs", // Light theme
  "vs-dark", // Dark theme
  "hc-black", // High Contrast Black
];
