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


const Main = () => {
  const fromCurrencyRef = useRef<HTMLDivElement>(null)
  const toCurrencyRef = useRef<HTMLDivElement>(null)
  const popupRef = useRef<HTMLDivElement>(null)
  const toDropIconRef = useRef<HTMLImageElement>(null)
  const fromDropIconRef = useRef<HTMLImageElement>(null)
  const amountRef = useRef<HTMLInputElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const fromArrowRef = useRef<SVGSVGElement>(null)
  const toArrowRef = useRef<SVGSVGElement>(null)
  const [fromCountryCode, setFromCountryCode] = useState("ng") //set this based on users location
  const [fromCurrency, setFromCurrency] = useState("NGN") // set this based on users location
  const [toCountryCode, setToCountryCode] = useState("us")
  const [toCurrency, setToCurrency] = useState("USD") // Explict about Type String
  const [fromselectionActive, setFromSelectionActive] = useState(false)
  const [toselectionActive, setToSelectionActive] = useState(false)
  const [result, setResult] = useState("")
  const [result2, setResult2] = useState("")
  const [toRate, setToRate] = useState("")
  const [fromRate, setFromRate] = useState(1)
  const [initialize, setInitialize] = useState("OFF")
  const [resultStatus, setResultStatus] = useState("")
  const [allowConversion, SetAllowConversion] = useState(true)
  const [fromRateColor, setFromRateColor] = useState("0, 0, 0")
  const [toRateColor, setToRateColor] = useState("0, 0, 0")
  const [fromRateIconColor, setFromRateIconColor] = useState("")
  const [toRateIconColor, setToRateIconColor] = useState("")
  const [toCurrencyColor, setToCurrencyColor] = useState("gray")
  const [fromCurrencyColor, setFromCurrencyColor] = useState("gray")
  const [converted, setConverted] = useState(false)
  const [convertRate, setConvertRate] = useState("")
  const [fromAngle, setFromAngle] = useState("")
  const [toAngle, setToAngle] = useState("")
  // --------------------------------
  const [prevFromCurrency, setPrevFromCurrency] = useState("")
  const [prevToCurrency, setPrevToCurrency] = useState("")
  const [input, setInput] = useState("")
  const [prevInput, setPrevInput] = useState("")
  const [isModeOn, setIsModeOn] = useState(false);


  // *API's used in this project
  // https://flagcdn.com/16x12/{country}.png -->> Country Flag API 
  // https://api.apilayer.com/currency_currencyData/convert?to=USD&from=EUR& amount=20&  --header 'apikey: YOUR API KEY -->> Currency conversion API

  // Set Selected Currency
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

  // Switch Currencies
  const switchCurrencies = () => {
    setFromCurrency(toCurrency)
    setFromCountryCode(toCountryCode)
    setToCurrency(fromCurrency)
    setToCountryCode(fromCountryCode)
    setIsModeOn(!isModeOn);
    if (isModeOn) {
      setConvertRate(toRate)
    } else {
      const val: any = Number(fromRate) / Number(toRate)
      setConvertRate(val)
    }
  }

  // Render Result 
  const resultData = () => {
    if (result === "" && initialize === "OFF") {
      return <p className="">Set an amount and pick currencies.</p>
    } else if (result === "" && initialize === "ON" || resultStatus === "in-progress") {
      return <SkelentonLoader />
    } else if (result !== "" && initialize === "ON" || resultStatus === "done") {
      return <div className="flex gap-5">
        <div className={`text-${fromCurrencyColor}-500  flex items-center gap-2`}>{Number(Number(amountRef.current?.value).toFixed(2)).toLocaleString()} <div className="text-gray-600 font-[600]">{fromCurrency}</div></div>
        <div>=</div>
        <div className={`text-${toCurrencyColor}-500 flex items-center gap-2`}>{Number(Number(result).toFixed(2)).toLocaleString()} <div className="text-gray-600 font-[600]">{toCurrency}</div></div>
      </div>
    }
  }

  // Disable Button If the user Have a Conversion 
  useEffect(() => {
    console.log("checking1...", prevToCurrency, prevFromCurrency)
    console.log("checking2...", toCurrency, fromCurrency)
    if (fromCurrency !== prevFromCurrency || toCurrency !== prevToCurrency || prevInput !== input) {
      if (amountRef.current?.value === "") {
        console.log("denying...")
        SetAllowConversion(false)
        buttonRef.current?.classList.add("disable-btn")
        buttonRef.current?.classList.remove("convert_btn")
      } else if (amountRef.current?.value !== "") {
        // check if the currencies have been converted 
        if (fromCurrency === prevToCurrency || toCurrency === prevFromCurrency) {
          setConverted(true)
        } else {
          setConverted(false)
        }
        console.log("allowing...")
        SetAllowConversion(true)
        buttonRef.current?.classList.remove("disable-btn")
        buttonRef.current?.classList.add("convert_btn")
      }
    } else if (fromCurrency === prevFromCurrency || toCurrency === prevToCurrency || prevInput === input) {
      console.log("denying...")
      SetAllowConversion(false)
      buttonRef.current?.classList.add("disable-btn")
      buttonRef.current?.classList.remove("convert_btn")
    }

    // set colours based on rates and conversion
    if (Number(toRate) < Number(result2) || Number(result2) < Number(toRate)) {
      console.log(result2, toRate)
      console.log("update 1")
      setToRateColor("0, 225, 0")
      setFromRateColor("225, 0, 0")
      setToRateIconColor("green")
      setFromRateIconColor("red")
      setToAngle("180")
      setFromAngle("360")
    } else if (Number(toRate) > Number(result2) || Number(result2) > Number(toRate)) {
      console.log("update 2")
      setToRateColor("225, 0, 0")
      setFromRateColor("0, 225, 0")
      setToRateIconColor("red")
      setFromRateIconColor("green")
      setToAngle("360")
      setFromAngle("180")
    } else {
      setToRateColor("0, 0, 0")
      setToRateIconColor("gray")
      setFromRateColor("0, 0, 0")
      setFromRateIconColor("gray")
    }
  }, [toCurrency, fromCurrency, resultStatus, input])


  useEffect(() => {
  }, [resultStatus])

  // On button Click Convert the rate 
  const convert = async () => {
    if (amountRef.current?.value !== "") {
      setInitialize("ON")
    } else return;

    setPrevFromCurrency(fromCurrency)
    setPrevToCurrency(toCurrency)
    setPrevInput(input)
    if (allowConversion) {

      // if (converted) {
      //   // run calculation
      //   console.log("running calc...")
      //   const calcValue: any = Number(input) * Number(convertRate)
      //   setResult(calcValue)
      // } else {
        // api....
        setResultStatus("in-progress")
        console.log("allowed")
        try {
          const API_KEY = "PAYm8V31jag923Q0gOD5NXr4bUKKzja5";
          const axiosConfig = {
            headers: {
              'apikey': API_KEY
            }
          };
          const response = await axios.get(`https://api.apilayer.com/currency_data/convert?to=${toCurrency}&from=${fromCurrency}&amount=${amountRef.current?.value}`, axiosConfig);
          const switchResponse = await axios.get(`https://api.apilayer.com/currency_data/convert?to=${fromCurrency}&from=${toCurrency}&amount=${amountRef.current?.value}`, axiosConfig);
          setResult2((Number(switchResponse.data.result) / Number(amountRef.current?.value)).toLocaleString())
          // Assuming your API returns JSON data, you can access it like this:
          setToRate((Number(response.data.result) / Number(amountRef.current?.value)).toLocaleString()); //.toFixed(2)
          // setInitialize("OFF")
          setResultStatus("done")
          setResult(response.data.result)
          popupRef.current?.classList.add("success-popup")
          setTimeout(() => {
            popupRef.current?.classList.remove("success-popup")
          }, 4000)

        } catch (error) {
          console.error('Error:', error);
        // }
      }
    } else {
      console.log("denied")
    }
  };

  // omits use of letters and symbols form input
  const validateInput = () => {
    const inputValue: any = Number(amountRef.current?.value).toLocaleString()
    setInput(Number(amountRef.current?.value).toLocaleString())
    const formattedValue = inputValue.toLocaleString();
    const numberPattern = /^[0-9]+$/;
    if (numberPattern.test(inputValue)) {
      console.log('Input contains only numbers:', inputValue);
      console.log('Formatted value:', formattedValue);
    } else {
      console.log('Input does not contain only numbers:', inputValue);
    }
  }


  // From Currency Selection Drop down Animation
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

  // To Currency Selection Drop down Animation
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
        <p ref={popupRef} className=" z-10 text-gray-700 text-[12px] bg-green-200 shadow-lg font-[400] p-[15px] rounded-lg absolute opacity-0">Successfully Converted {Number(Number(amountRef.current?.value).toFixed(2)).toLocaleString()} {fromCurrency} to {toCurrency} </p>
        {/* </div> */}

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
              <div style={{ backgroundColor: `rgba(${fromRateColor}, 0.1)` }} className={`from-rate-cont flex items-center justify-center  px-[13px] py-[3px] rounded-full gap-1`}>
                <div className={`from-rate-text text-${fromRateColor}-500  flex items-center gap-2`}>{Number(fromRate).toFixed(2)} <div className="text-gray-600 font-[600]">{fromCurrency}</div></div>
                <svg style={{ rotate: `${fromAngle}deg` }} ref={fromArrowRef} width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7.54169 2V13.0833" stroke={fromRateIconColor} stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
                  <path d="M13.0833 7.54169L7.54167 13.0834L2 7.54169" stroke={fromRateIconColor} stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </div>
              <div>=</div>
              <div style={{ backgroundColor: `rgba(${toRateColor}, 0.1)` }} className={`flex items-center justify-center  px-[13px] py-[3px] rounded-full gap-1`}>
                <div className={`text-${toRateColor}-500 flex items-center gap-2`} >{toRate} <div className="text-gray-600 font-[600]">{toCurrency}</div></div>
                <svg style={{ rotate: `${toAngle}deg` }} ref={toArrowRef} width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7.54169 2V13.0833" stroke={toRateIconColor} stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
                  <path d="M13.0833 7.54169L7.54167 13.0834L2 7.54169" stroke={toRateIconColor} stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
                </svg>

              </div>
            </div>
          </div>
          {/* line */}
          <div className="w-[100%] h-[2px] bg-gray-200 relative "></div>
          {/* Conversion*/}
          <div className="flex items-start justify-center flex-col gap-[10px]">
            <p className="font-[600] text-gray-700">Conversion</p>
            <div className="flex w-[70%] gap-5">
              {resultData()}
            </div>
          </div>
        </div>

        {/* button */}
        <button onClick={convert} ref={buttonRef} className="convert_btn">
          Convert
        </button>
      </div>

    </div>
  );
};

export default Main;
