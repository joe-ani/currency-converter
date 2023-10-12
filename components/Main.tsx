"use client"

import currencyData from "@/app/countriesData.json"
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import SkelentonLoader from "./SkelentonLoader";
import axios from "axios";

type CurrencyData = {
  alpha2: String,
  currencyCode: String
}
const typedCurrencyData: CurrencyData[] = currencyData

const Main = () => {
  const fromCurrencyRef = useRef<HTMLDivElement>(null)
  const toCurrencyRef = useRef<HTMLDivElement>(null)
  const popupRef = useRef<HTMLDivElement>(null)
  const toDropIconRef = useRef<HTMLImageElement>(null)
  const fromDropIconRef = useRef<HTMLImageElement>(null)
  const amountRef = useRef<HTMLInputElement>(null)
  const [fromCountryCode, setFromCountryCode] = useState("gb")
  const [toCountryCode, setToCountryCode] = useState("us")
  const [fromCurrency, setFromCurrency] = useState("GBP")
  const [toCurrency, setToCurrency] = useState("USD") // Explict about Type String
  const [fromselectionActive, setFromSelectionActive] = useState(false)
  const [toselectionActive, setToSelectionActive] = useState(false)
  const [countries, setCountries] = useState([]);
  const [result, setResult] = useState("")
  const [toRate, setToRate] = useState("")
  const [fromRate, setFromRate] = useState(1)
  const [initialize, setInitialize] = useState("OFF")

  // https://flagcdn.com/16x12/{country}.png -->> Country Flag API 
  // https://api.apilayer.com/currency_currencyData/convert?to=USD&from=EUR& amount=20&  --header 'apikey: YOUR API KEY -->> Currency conversion API

  const updateToCurrency = (data: any) => {
    console.log(data.alpha2, data.currencyCode)
    setToCurrency(data.currencyCode)
    setToCountryCode(data.alpha2.toLocaleLowerCase())
  }
  const updateFromCurrency = (data: any) => {
    console.log(data.alpha2, data.currencyCode)
    setFromCurrency(data.currencyCode)
    setFromCountryCode(data.alpha2.toLocaleLowerCase())
  }

  const switchCurrencies = () => {
    setFromCurrency(toCurrency)
    setFromCountryCode(toCountryCode)
    setToCurrency(fromCurrency)
    setToCountryCode(fromCountryCode)
  }



  const convert = async () => {
    setInitialize("ON")
    try {
      const API_KEY = "PAYm8V31jag923Q0gOD5NXr4bUKKzja5";
      const axiosConfig = {
        headers: {
          'apikey': API_KEY
        }
      };
      const response = await axios.get(`https://api.apilayer.com/currency_data/convert?to=${toCurrency}&from=${fromCurrency}&amount=${amountRef.current?.value}`, axiosConfig);
      // Assuming your API returns JSON data, you can access it like this:
      setToRate((Number(response.data.result) / Number(amountRef.current?.value)).toFixed(2));
      setResult(response.data.result)
      popupRef.current?.classList.add("success-popup")
      setTimeout(() => {
        popupRef.current?.classList.remove("success-popup")
      }, 2100)
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const validateInput = () => {
    const inputValue: any = Number(amountRef.current?.value).toLocaleString()
    // e.target.value =  Number(amountRef.current?.value).toLocaleString()
    const formattedValue = inputValue.toLocaleString();


    const numberPattern = /^[0-9]+$/;

    if (numberPattern.test(inputValue)) {
      console.log('Input contains only numbers:', inputValue);
      console.log('Formatted value:', formattedValue);
    } else {
      console.log('Input does not contain only numbers:', inputValue);
    }
  }


  const openFromSelection = () => {
    // open DropDown
    if (fromselectionActive !== true) {
      setFromSelectionActive(true)
      fromCurrencyRef.current?.classList.add("show-selection")
      fromDropIconRef.current?.classList.add("from-drop-icon")
      fromCurrencyRef.current?.classList.remove("new-show-selection")
    } else {
      setFromSelectionActive(false)
      fromCurrencyRef.current?.classList.remove("show-selection");
      fromDropIconRef.current?.classList.remove("from-drop-icon")
      setTimeout(() => {
        fromCurrencyRef.current?.classList.add("new-show-selection")
      }, 250)
    }
  }

  const openToSelection = () => {
    // Open DropDown
    if (toselectionActive !== true) {
      setToSelectionActive(true)
      toCurrencyRef.current?.classList.add("show-selection")
      toDropIconRef.current?.classList.add("to-drop-icon")
      toCurrencyRef.current?.classList.remove("new-show-selection")
    } else {
      setToSelectionActive(false)
      toCurrencyRef.current?.classList.remove("show-selection");
      toDropIconRef.current?.classList.remove("to-drop-icon")
      setTimeout(() => {
        toCurrencyRef.current?.classList.add("new-show-selection")
      }, 250)
    }
  }


  return (
    <div
      className="main-cont w-[65%] p-[80px] bg-white rounded-[30px] border-[2px] border-black-500 shadow-lg absolute top-[150px]"
    >
      {/* top section */}
      <div className="flex gap-[100px] items-center justify-center border-red-600 border-0">
        {/* ---Success--- */}
        <p ref={popupRef} className=" z-10 text-gray-700 text-[12px] bg-green-200 shadow-lg font-[400] p-[15px] rounded-lg absolute opacity-0">Successfully Converted 50 USD to EUR </p>
        {/* Input */}
        <div className="flex flex-col ">
          <p className="font-[600] text-gray-700 select-none">Amount</p>
          <input ref={amountRef} onChange={validateInput} type="number" className="number-input bg-gray-200 p-[10px] rounded-md border-l-4 border-[#059DFC] focus:outline-none " />
        </div>

        <div className="flex items-center justify-center gap-9">
          {/* First Dropdown */}
          <div className="flex flex-col">
            <p className="font-[600] text-gray-700 select-none">From</p>

            {/* Curency selection*/}
            <div onClick={openFromSelection} className="flex justify-between cursor-pointer rounded-md p-[10px] bg-[#fff] border-2 border-gray-200 z-20 w-[150px] relative">
              <div className="flex items-center justify-center gap-1 ">
                <Image width={17} height={10} src={`https://flagcdn.com/16x12/${fromCountryCode}.png`} alt="country flag" />
                <div className="select-none">{fromCurrency}</div>
              </div>
              {/* drop down icon */}
              <Image width={20} height={100} src="assets/drop.svg" className="drop-icon transition-all  select-none" ref={fromDropIconRef} alt="icon" />

              {/* options */}
              <div ref={fromCurrencyRef} className="new-show-selection currency-selection flex flex-col absolute mt-[50px] border-2 border-gray-300 w-full rounded-[10px] shadow-xl gap-[10px] overflow-y-scroll left-0 h-[200px] bg-white z-10">
                {currencyData.map((data =>
                  <div onClick={() => updateFromCurrency(data)} className="flex items-center gap-1  p-[10px] hover:bg-gray-300">
                    <Image width={17} height={10} src={`https://flagcdn.com/16x12/${data.alpha2.toLocaleLowerCase()}.png`} alt="country flag" />
                    <div>{data.currencyCode}</div>
                  </div>
                ))}

                {/* ---------- */}
              </div>
            </div>
          </div>

          {/* switch icon */}
          <div onClick={switchCurrencies} className=" flex items-center justify-center w-[35px] h-[35px] border-2 rounded-full mt-5 p-[7px] cursor-pointer hover:bg-[#e6e6e6] scale-[1.1] transition-all active:scale-[.9]">
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
                <Image width={17} height={10} src={`https://flagcdn.com/16x12/${toCountryCode}.png`} alt="country flag" />
                <div className="select-none">{toCurrency}</div>
              </div>
              {/* drop down icon */}
              <Image width={20} height={100} src="assets/drop.svg" className="drop-icon transition-all  select-none" ref={toDropIconRef} alt="icon" />

              {/* options */}
              <div ref={toCurrencyRef} className=" new-show-selection currency-selection flex flex-col absolute mt-[50px] border-2 border-gray-300 w-full rounded-[10px] shadow-xl  gap-[10px] overflow-y-scroll left-0 h-[200px] bg-white z-10">
                {currencyData.map((data =>
                  <div onClick={() => updateToCurrency(data)} className="flex items-center gap-1  p-[10px] hover:bg-gray-300">
                    <Image width={17} height={10} src={`https://flagcdn.com/16x12/${data.alpha2.toLocaleLowerCase()}.png`} alt="country flag" />
                    <div>{data.currencyCode}</div>
                  </div>
                ))}
                {/* -------- */}
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
          {/* toRates */}
          <div className="flex items-center justify-center flex-col relativen gap-[10px]">
            <p className="font-[600] text-gray-700">Rates</p>
            {/* <SkelentonLoader /> */}

            <div className="flex gap-5">
              <div className="text-red-500  flex items-center gap-2">{Number(fromRate).toFixed(2)} <div className="text-gray-600 font-[600]">{fromCurrency}</div></div>
              <div>=</div>
              <div className="text-green-500 flex items-center gap-2" >{toRate} <div className="text-gray-600 font-[600]">{toCurrency}</div></div>
            </div>
          </div>
          {/* line */}
          <div className="w-[100%] h-[2px] bg-gray-200 relative "></div>
          {/* Conversion*/}
          <div className="flex items-start justify-center flex-col gap-[10px]">
            <p className="font-[600] text-gray-700">Conversion</p>
            <div className="flex w-[70%] gap-5">
              {/* conditional */}



              <div className="flex gap-5">
                <div className="text-red-500  flex items-center gap-2">{Number(amountRef.current?.value).toFixed(2)} <div className="text-gray-600 font-[600]">{fromCurrency}</div></div>
                <div>=</div>
                <div className="text-green-500 flex items-center gap-2" >{Number(result).toFixed(2)} <div className="text-gray-600 font-[600]">{toCurrency}</div></div>
              </div>

              {/* <p className="">Select The Currency of choice and amount to begin Conversion.</p> */}
            </div>
          </div>
        </div>

        {/* button */}
        <button onClick={convert} className="convert_btn transition-all hover:bg-[#006abb] active:scale-[.9] ">
          Convert
        </button>
      </div>

    </div>
  );
};

export default Main;
