"use client"


import currencyData from "@/app/countriesData.json"
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

type CurrencyData = {
  alpha2: String,
  alpha3: String
}
const typedCurrencyData: CurrencyData[] = currencyData

const Main = () => {

  const fromCurrencyRef = useRef<HTMLDivElement>(null)
  const toCurrencyRef = useRef<HTMLDivElement>(null)
  const toDropIconRef = useRef<HTMLElement>(null)
  const fromDropIconRef = useRef<HTMLElement>(null)
  const [fromCurrency, setFromCurrency] = useState("USD")
  const [toCurrency, setToCurrency] = useState<String>("EUR") // Explict about Type String
  const [fromselectionActive, setFromSelectionActive] = useState(false)
  const [toselectionActive, setToSelectionActive] = useState(false)
  const [countries, setCountries] = useState([]);

  // https://flagcdn.com/16x12/{country}.png -->> Country Flag API 
  // https://api.apilayer.com/currency_currencyData/convert?to=USD&from=EUR& amount=20&  --header 'apikey: YOUR API KEY -->> Currency conversion API


  useEffect(() => {
    console.log(currencyData)
  }, [])

  const openFromSelection = () => {
    // open DropDown
    if (fromselectionActive !== true) {
      setFromSelectionActive(true)
      fromCurrencyRef.current?.classList.add("show-selection")
      fromDropIconRef.current?.classList.add("from-drop-icon")
    } else {
      setFromSelectionActive(false)
      fromCurrencyRef.current?.classList.remove("show-selection");
      fromDropIconRef.current?.classList.remove("from-drop-icon")
    }
  }

  const openToSelection = () => {
    // Open DropDown
    if (toselectionActive !== true) {
      setToSelectionActive(true)
      toCurrencyRef.current?.classList.add("show-selection")
      toDropIconRef.current?.classList.add("to-drop-icon")
    } else {
      setToSelectionActive(false)
      toCurrencyRef.current?.classList.remove("show-selection");
      toDropIconRef.current?.classList.remove("to-drop-icon")
    }
  }

  

  return (
    <div
      className="main-cont w-[65%] p-[80px] bg-white rounded-[30px] border-[2px] border-black-500 shadow-lg absolute top-[150px]"
    >
      {/* top section */}
      <div className="flex gap-[100px] items-center justify-center   border-red-600 border-0">

        {/* Input */}
        <div className="flex flex-col ">
          <p className="font-[600] text-gray-700 select-none">Amount</p>
          <input type="text" className="bg-gray-200 p-[10px] rounded-md border-l-4 border-[#059DFC] focus:outline-none " />
        </div>

        <div className="flex items-center justify-center gap-9">
          {/* First Dropdown */}
          <div className="flex flex-col">
            <p className="font-[600] text-gray-700 select-none">From</p>
            {/* Curency selection*/}
            <div onClick={openFromSelection} className="flex justify-between cursor-pointer rounded-md p-[10px] bg-[#fff] border-2 border-gray-200 w-[150px] relative">
              <div className="flex items-center justify-center gap-1 ">
                <Image width={17} height={10} src="https://flagcdn.com/16x12/us.png" alt="country flag" />
                <div className="select-none">{fromCurrency}</div>
              </div>
              {/* drop down icon */}
              <Image width={20} height={100} src="assets/drop.svg" className="drop-icon transition-all" ref={fromDropIconRef} alt="icon" />

              {/* options */}
              <div ref={fromCurrencyRef} className="currency-selection flex flex-col absolute mt-[50px] border-2 border-gray-300 w-full rounded-[10px] shadow-xl gap-[10px] overflow-y-scroll left-0 h-[200px] bg-white z-10">
                {/* {currencyData.map((data) => {
                  <p>{data}</p>
                })} */}
                <div className="flex items-center  p-[10px] hover:bg-gray-300">
                  <Image width={10} height={10} src="" alt="country flag" />
                  <div>USD</div>
                </div>

                {/* ---------- */}
              </div>
            </div>
          </div>

          {/* switch icon */}
          <div className=" flex items-center justify-center w-[35px] h-[35px] border-2 rounded-full mt-5 p-[7px] cursor-pointer hover:bg-[#e6e6e6] scale-[1.1] transition-all active:scale-[.9]">
            <Image
              width={100}
              height={100}
              src="assets/arrow.svg"
              alt="arrow icon"
            />
          </div>

          {/* Second Dropdown */}
          <div className="flex flex-col">
            <p className="font-[600] text-gray-700 select-none">To</p>

            {/* Curency selection*/}
            <div onClick={openToSelection} className="flex justify-between cursor-pointer rounded-md p-[10px] bg-[#fff] border-2 border-gray-200 w-[150px] relative">
              <div className="flex items-center justify-center gap-1 ">
                <Image width={17} height={10} src="https://flagcdn.com/16x12/eu.png" alt="country flag" />
                <div className="select-none">{toCurrency}</div>
              </div>
              {/* drop down icon */}
              <Image width={20} height={100} src="assets/drop.svg" className="drop-icon transition-all" ref={toDropIconRef} alt="icon" />


              {/* options */}
              <div ref={toCurrencyRef} className="currency-selection flex flex-col absolute mt-[50px] border-2 border-gray-300 w-full rounded-[10px] shadow-xl  gap-[10px] overflow-y-scroll left-0 h-[200px] bg-white z-10">
                <div className="flex items-center  p-[10px] hover:bg-gray-300">
                  <Image width={10} height={10} src="" alt="country flag" />
                  <div>USD</div>
                </div>

                {/* ---------- */}
              </div>
            </div>

          </div>
        </div>
      </div>


      {/* Lower container*/}
      <div className="flex items-center justify-between mt-[50px] mx-[55px]  border-red-600 border-0" >

        {/* output */}
        <div className="flex flex-col gap-3 w-[300px]  border-red-600 border-0">
          {/* line */}
          <div className="w-[100%] h-[2px] bg-gray-200 "></div>
          {/* Rates */}
          <div className="flex items-center justify-center flex-col relativen gap-[10px]">
            <p className="font-[600] text-gray-700">Rates</p>
            <div className="flex gap-5">
              <div className="text-red-500  flex items-center gap-2">1.00 <div className="text-gray-600 font-[600]">USD</div></div>
              <div>=</div>
              <div className="text-green-500 flex items-center gap-2" >1.70 <div className="text-gray-600 font-[600]">EUR</div></div>
            </div>
          </div>
          {/* line */}
          <div className="w-[100%] h-[2px] bg-gray-200 relative "></div>
          {/* Conversion*/}
          <div className="flex items-start justify-center flex-col gap-[10px]">
            <p className="font-[600] text-gray-700">Conversion</p>
            <div className="flex gap-5">
              <p className="">Select The Currency of choice and amount to begin Conversion.</p>
            </div>
          </div>
        </div>

        {/* button */}
        <button className="convert_btn transition-all hover:bg-[#006abb] active:scale-[.9] ">
          Convert
        </button>
      </div>

    </div>
  );
};

export default Main;
