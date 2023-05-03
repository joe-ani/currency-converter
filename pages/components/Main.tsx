import React from 'react'

function Main() {


  const showDrop = () => {

  }

  return (
    <div className="flex flex-col gap-10 shadow-[0_0_20px_#ccc7] w-full h-80 p-10 rounded-xl mb-10 absolute z-40
     bg-white top-40" style={{ maxWidth: "70%" }}>
      <div className="flex items-center justify-between gap-[20px]">     
        <input type="text" className="border-2 border-gray rounded-[5px] p-1" />
        <div className="flex items-center gap-[80px]">
        <div onClick={showDrop} className="flex items-center justify-between p-4  w-[160px] h-[30px] border-2 border-gray rounded-[5px]">
          <div className="">USD</div>
          <div className="">^</div>
        </div>
        <div className="flex items-center justify-between p-2  w-[160px] h-[30px] border-2 border-gray rounded-[5px]">
          <div className="">USD</div>
          <div className="">^</div>
        </div>
        </div>
        {/* selectors */}
        {/* From */}
        {/* icon */}
        {/* To */}
      </div>
      <div className="flex gap-10">
        {/* Conversions */}
        <div className='' >
          <div className="font-bold text-gray-600">Rate</div>
          <div className="font-bold text-gray-600">Conversion</div>
        </div>
        {/* button */}
        <button className='bg-green-400 p-2 rounded-[5px] text-white shadow-[0_0_8px_#ccc] font-normal w-[100px]
         h-[35px] text-center hover:bg-green-500 flex items-center justify-center'>Convert</button>
      </div>
    </div>
  )
}

export default Main