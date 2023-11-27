"use client"

import Image from "next/image";
import { useState, useRef, useContext } from "react";
import StateGlobalContext from "@/app/contextData"


const MyLink = () => {
    const [angle, setAngle] = useState("-90deg")
    const [toggle, setToggle] = useState(false)
    // const [containerDisplay, setContainerDisplay] = useState("flex")
    const linkContRef = useRef<HTMLDivElement>(null)
    const iconContRef = useRef<HTMLDivElement>(null)
    const { loading } = useContext(StateGlobalContext)


    const toggleLink = () => {
        setToggle(!toggle)
        if (toggle) {
            setAngle("90deg")
            iconContRef.current?.classList.add("icon-cont")
            linkContRef.current?.classList.remove("remove")
            linkContRef.current?.classList.add("link-cont")
            linkContRef.current?.classList.remove("link-cont-close")
        } else {
            setAngle("-90deg")
            setTimeout(() => {
                linkContRef.current?.classList.add("remove")
            }, 200)
            iconContRef.current?.classList.remove("icon-cont")
            linkContRef.current?.classList.remove("link-cont")
            linkContRef.current?.classList.add("link-cont-close")
        }
    }


    return (
        <div className="flex gap-3 items-center justify-center z-10 fixed bottom-10 left-10 cursor-pointer">
            {/* Image */}
            <div className="relative flex items-center justify-center">

                <Image onClick={toggleLink} width={45} height={10} alt="" src="/assets/mypicRounded.png " className="transition-all active:scale-[.9] z-10 " />
                {/* Text container */}
                <div ref={linkContRef} className="remove transition-all flex items-center justify-center gap-2 bg-[#0000001c] backdrop-blur-sm text-[#3a3a3a] border-[#00000013] border-2 rounded-full p-1 px-5 absolute shadow-xl hover:bg-[#4d4d4d1c] select-none active:border-[#8d8d8d] active:scale-[.9]">
                    {/* Info Icon */}
                    Developer
                </div>
                {/* Arrow Icon */}

                <div onClick={toggleLink} ref={iconContRef} className="transition-all flex items-center justify-center w-[40px] h-[40px] bg-[#0000001c] backdrop-blur-sm text-[#3a3a3a] border-[#00000013] border-2 rounded-full ml-[0px] hover:bg-[#2d2d2d1c] active:scale-[.9] active:border-[#8d8d8d] shadow-xl">
                    <Image width={20} height={100} style={{ rotate: angle }} src="assets/drop.svg" className="transition-all duration-300   select-none" alt="icon" />
                </div>

            </div>

        </div>
    )
}

export default MyLink