import React from "react";
import { AiOutlineAudio } from "react-icons/ai";
import { CiVideoOn } from "react-icons/ci";
import { FaChevronUp } from "react-icons/fa6";

const Call_Controls = ({isCallingButtonsOn,setisCallingButtonsOn}) => {
  return (
    <>
      {/* Bottom Call Controls */}
      <div className="bg-white relative -translate-y-[100px] bottom-0 left-[40%] z-40">
        <div
          className={`z-50 absolute mx-auto ${
            isCallingButtonsOn ? "" : "translate-y-16"
          } transition-all duration-300 `}
        >
          <FaChevronUp
            onClick={() => setisCallingButtonsOn((p) => !p)}
            className={`mx-auto text-3xl ${
              isCallingButtonsOn ? "rotate-180" : ""
            } text-purple-500 transition-all duration-300 hover:scale-110 cursor-pointer`}
          ></FaChevronUp>

          <div className="bg-dark-navy p-2 mb-2 px-10 rounded-full flex gap-5">
            <div className="p-2 rounded-md bg-purple-800">
              <AiOutlineAudio className="text-2xl text-white"></AiOutlineAudio>
            </div>
            <div className="p-2 rounded-md bg-purple-800">
              <CiVideoOn className="text-2xl text-white"></CiVideoOn>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Call_Controls;
