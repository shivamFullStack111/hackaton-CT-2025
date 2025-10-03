import React from 'react'
import { FaBell } from "react-icons/fa6";
import { IoSettingsOutline } from "react-icons/io5";
import { TbCopy } from "react-icons/tb";
import { FaAngleDown } from "react-icons/fa6";
import JoinedUsersPopUp from './JoinedUsersPopUp';




const Header = ({ currentPage, setlanguage, settheme, setactiveUsersPopUpOpen, activeUsersPopUpOpen }) => {

    return (
        <>
            {activeUsersPopUpOpen && (
                <JoinedUsersPopUp
                setactiveUsersPopUpOpen={setactiveUsersPopUpOpen}
                ></JoinedUsersPopUp>
            )}
            <div className=' p-4 bg-dark-navy items-center flex justify-between  '>
                <div className='flex gap-2 items-center'>
                    <img className='h-10 w-10 ' src="/public/ai.gif" alt="" />
                    <div >
                        <p className='font-bold text-purple-500'>Python</p>
                        <p className='text-gray-300 gap-2 flex  items-center leading-4 text-sm'>
                            <span>Room ID:  </span>
                            <span className='text-blue-300'>{" "}3176-5535-4788 </span>
                            <TbCopy onClick={async () => await navigator.clipboard.writeText("317655354788")} title="Copy" className=' hover:scale-110 cursor-pointer '></TbCopy>
                        </p>
                    </div>
                </div>
                {currentPage == "editor" && <div className='flex gap-5 items-center'>
                    <select onChange={(e) => setlanguage(e.target.value)} className='bg-dark-navy text-white outline-none font-mono' name="" id="">
                        {monacoLanguages.map((l) => (
                            <option selected={l == 'javascript'} value={l}>{l}</option>
                        ))}
                    </select>
                    <select onChange={(e) => settheme(e.target.value)} className='bg-dark-navy text-white outline-none font-mono' name="" id="">
                        {monacoThemes.map((l) => (
                            <option selected={l == 'vs-dark'} value={l}>{l}</option>
                        ))}
                    </select>
                </div>}

                <div className='flex gap-6  items-center'>
                    <div onClick={() => setactiveUsersPopUpOpen(true)} className='flex  mr-10 translate-x-10 text-white hover:text-purple-500 relative items-center cursor-pointer '>
                        <div className='  h-8 w-8 rounded-full '>
                            <img className='h-full w-full rounded-full' src="/public/s3.png" alt="" />
                        </div>
                        <div className=' -translate-x-4  h-8 w-8 rounded-full '>
                            <img className='h-full w-full rounded-full' src="/public/s3.png" alt="" />
                        </div>
                        <div className=' -translate-x-8  h-8 w-8 rounded-full '>
                            <img className='h-full w-full rounded-full' src="/public/s1.png" alt="" />
                        </div>
                        <div className='  -translate-x-12  h-8 w-8 rounded-full '>
                            <img className='h-full w-full rounded-full' src="/public/s3.png" alt="" />
                        </div>

                        <FaAngleDown className='   -translate-x-10 text-lg'></FaAngleDown>
                    </div>
                    <FaBell className='text-2xl text-white'></FaBell>
                    <IoSettingsOutline className='text-2xl text-white'></IoSettingsOutline>

                </div>

            </div >
        </>
    )
}

export default Header


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
    "yaml"
];

const monacoThemes = [
    "vs",       // Light theme
    "vs-dark",  // Dark theme
    "hc-black"  // High Contrast Black
];