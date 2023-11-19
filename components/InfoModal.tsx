"use client"

import { useState } from "react";


const InfoModal = () => {
    const [state, setstate] = useState()

    return (
        <div className="hidden items-center justify-center z-50 absolute top-0 left-0 w-full h-full bg-[#5c5c5c61] backdrop-blur-sm">

            <div className="flex bg-[#fff] w-[200px] h-[100px] rounded-lg border-[#b5b5b5] border-[3px]">
                <div className="flex">
                    {/* Image */}
                    {/* User Name */}
                </div>
                <div className="flex">
                    {/* Links */}
                </div>

            </div>
        </div>
    )
}

export default InfoModal