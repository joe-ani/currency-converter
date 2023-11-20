"use client"

import Image from "next/image";
import { useState } from "react";


const InfoModal = () => {
    const [state, setstate] = useState()

    return (
        <div className="flex items-center justify-center z-50 absolute top-0 left-0 w-full h-full bg-[#5c5c5c61] backdrop-blur-sm ">

            <div className="flex gap-3 bg-[#fff] rounded-lg border-[#b5b5b5] border-[3px] p-[30px] shadow-sm">
                {/* Left */}
                <div className="flex flex-col items-center justify-center">
                    {/* Image */}
                    <Image width={70} height={10} alt="" src="/assets/mypicRounded.png " className="transition-all active:scale-[.9] z-10 " />
                    {/* User Name */}
                     <div>Joseph Ani</div>
                </div>
                {/* Line */}
                <div className="w-[2px] h-[100px] bg-[gray]"></div>
                {/* Right */}
                <div className="flex items-start justify-center flex-col gap-[10px]">
                    {/* Links */}
                    <div className=" p-[10px] bg-[gray] rounded-full border-[gray] border-[3px] px-[20px] py-[5px] transition-all active:scale-[.9] cursor-pointer" >
                        <Image width={10} height={10} alt="" src="" />
                        My Portfolio</div> 
                    <div className=" p-[10px] bg-[gray] rounded-full border-[gray] border-[3px] px-[20px] py-[5px] transition-all active:scale-[.9] cursor-pointer" >Git Repository</div> 
                </div>

            </div>
        </div>
    )
}

export default InfoModal