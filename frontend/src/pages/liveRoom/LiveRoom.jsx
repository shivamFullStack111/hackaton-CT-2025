



import Header from "./Header"
import { FaChevronUp } from "react-icons/fa6";
import { AiOutlineAudio } from "react-icons/ai";
import { CiVideoOn } from "react-icons/ci";
import { useState } from "react";
import SidebarLeft from "./SidebarLeft";
import { Excalidraw } from "@excalidraw/excalidraw";
import '../../../node_modules/@excalidraw/excalidraw/dist/dev/index.css'
import SidebarRight from "./SidebarRight";
import MyEditor from "@monaco-editor/react";
import { useParams } from "react-router-dom";
import QuizPage from "./QuizPage";


const LiveRoom = () => {
    const [isCallingButtonsOn, setisCallingButtonsOn] = useState(true);
    const [currentPage, setcurrentPage] = useState("whiteboard"); // whiteboard || editor || quiz
    const [language, setlanguage] = useState("javascript");
    const [theme, settheme] = useState("vs-dark");
    const [activeUsersPopUpOpen, setactiveUsersPopUpOpen] = useState(false);
    const [codeEditorCurrentValue, setcodeEditorCurrentValue] = useState();
    const [allLiveChatMessages, setallLiveChatMessages] = useState([])

    const { id: roomId } = useParams();
    const [excalidrawAPI, setExcalidrawAPI] = useState(null);

    return (
        <>
            <div>
                <Header
                    activeUsersPopUpOpen={activeUsersPopUpOpen}
                    setactiveUsersPopUpOpen={setactiveUsersPopUpOpen}
                    setlanguage={setlanguage}
                    settheme={settheme}
                    currentPage={currentPage}
                ></Header>
                <div className="h-[89.3vh] flex ">
                    <SidebarLeft ></SidebarLeft>

                    <div className="w-full bg-white overflow-hidden h-full flex flex-col ">
                        <div className="h-full relative  w-full">
                            <div
                                style={{ display: currentPage === "whiteboard" ? "" : "none" }}
                                className="w-full h-[100.5%] z-30"
                            >
                                <Excalidraw
                                    excalidrawAPI={(api) => setExcalidrawAPI(api)}
                                    onChange={() => { }}
                                />
                            </div>

                            <div
                                style={{ display: currentPage === "editor" ? "" : "none" }}
                                className="w-full h-[100.5%] z-30"
                            >
                                <MyEditor
                                    theme={theme}
                                    value={codeEditorCurrentValue}
                                    language={language}
                                    onChange={(newVal) => {
                                        setcodeEditorCurrentValue(newVal);
                                    }}
                                />
                            </div>

                               {/* Quiz */}
                            <div
                                style={{ display: currentPage === "quiz" ? "" : "none" }}
                                className="w-full h-[100.5%] z-30"
                            >
                                <QuizPage />
                            </div>

                            <div className="bg-white relative -translate-y-[100px] bottom-0 left-[40%] z-30">
                                <div
                                    className={`z-50 absolute mx-auto ${isCallingButtonsOn ? "" : "translate-y-16"
                                        } transition-all duration-300 `}
                                >
                                    <FaChevronUp
                                        onClick={() => setisCallingButtonsOn((p) => !p)}
                                        className={`mx-auto text-3xl ${isCallingButtonsOn ? "rotate-180" : ""
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
                        </div>
                    </div>

                    {/* sidebar right */}
                    <SidebarRight
                        setallLiveChatMessages={setallLiveChatMessages}
                        allLiveChatMessages={allLiveChatMessages}
                        currentPage={currentPage}
                        setcurrentPage={setcurrentPage}
                    ></SidebarRight>
                </div>
            </div>
        </>
    );
};

export default LiveRoom;