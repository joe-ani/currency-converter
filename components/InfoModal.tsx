"use client"

import Image from "next/image";
import { useState, useRef, useContext, useEffect } from "react";
import StateGlobalContext from "@/app/contextData"


const InfoModal = () => {
    const [toggle, setToggle] = useState(false)
    const bgRef = useRef<HTMLDivElement>(null)
    const mainRef = useRef<HTMLDivElement>(null)
    const contRef = useRef<HTMLDivElement>(null)
    const { modalState, setModalState } = useContext(StateGlobalContext)


    useEffect(() => {
        console.log(modalState)
        if (modalState === true) {
            bgRef.current?.classList.add("bg-animate-in")
            // contRef.current?.classList.add("")
            setTimeout(() => {
                mainRef.current?.classList.add("show")
            }, 300)
        } else return
    }, [modalState])

    const toggleModal = () => {
        setToggle(!toggle)
        setModalState(false)
        if (toggle) {
            bgRef.current?.classList.add("bg-animate-in")
            // contRef.current?.classList.add("")
            setTimeout(() => {
                mainRef.current?.classList.add("show")
            }, 300)
        } else {
            setTimeout(() => {
                mainRef.current?.classList.add("remove")
            }, 300)
            bgRef.current?.classList.add("bg-animate-out")
            // contRef.current?.classList.add("")
        }
    }

    return (
        <div ref={mainRef} className="hidden items-center justify-center">
            {/* Blurred BG */}
            <div ref={bgRef} onClick={toggleModal} className="blurred-bg absolute top-0 left-0 w-full h-full bg-[#5c5c5c61] backdrop-blur-sm z-30"></div>

            {/* Main about container */}
            <div ref={contRef} className="main-about-cont flex gap-3 bg-[#fff] rounded-xl border-[#cacaca] border-[2px] p-[40px] shadow-sm z-50 absolute top-[30%] ">
                {/* Left */}
                <div className="flex flex-col items-center justify-center">
                    {/* Image */}
                    <Image width={70} height={10} alt="" src="/assets/mypicRounded.png " className="transition-all active:scale-[.9] z-10 " />
                    {/* User Name */}
                    <div>Joseph Ani</div>
                </div>
                {/* Line */}
                <div className="w-[2px] h-[100px] bg-[#0000001c]"></div>
                {/* Right */}
                <div className="flex items-start justify-center flex-col gap-[10px]">
                    {/* Links */}
                    <a href="/" target="_blank" className="flex gap-2 p-[10px] bg-[#f3f3f3] rounded-full border-[#cacaca] border-[3px] px-[20px] py-[5px] transition-all active:scale-[.9] cursor-pointer active:border-[gray] hover:bg-[#dddddd] select-none" >
                        <Image width={20} height={10} alt="" src="/assets/link-alt-1-svgrepo-com.svg" />
                        My Portfolio
                    </a>
                    <a href="https://github.com/joe-ani/currency-converter" target="_blank" className="flex gap-2 p-[10px] bg-[#f3f3f3] rounded-full border-[#cacaca] border-[3px] px-[20px] py-[5px] transition-all active:scale-[.9] cursor-pointer active:border-[gray] hover:bg-[#dddddd] select-none" >
                        <Image width={20} height={10} alt="" src="/assets/git-merge-svgrepo-com (1).svg" />
                        Git Repository
                    </a>
                </div>

            </div>
        </div>
    )
}

export default InfoModal