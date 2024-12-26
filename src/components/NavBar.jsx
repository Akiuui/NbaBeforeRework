import React, { useEffect, useRef, useState } from "react";

import Calendar from "../utils/calendar.js"
import MonthToNumber from "../utils/monthToNumber.js"
import NumberToMonth from "../utils/numberToMonth.js"
import notifToast from "../utils/notifToast.js"

// import useToast from "../../hooks/useToast";
function NavBar({ date, setDate, isPlayoff, isOffseason /*setElementToDisable */}) {


    const [dayState, setDayState] = useState("")
    const [monthState, setMonthState] = useState("")
    const [yearState, setYearState] = useState("")

    const [monthDisplay, setMonthDisplay] = useState("")

    const [arrowFillColorLeft, setArrowFillColorLeft] = useState("none")
    const [arrowFillColorRight, setArrowFillColorRight] = useState("none")

    const [monthStateIsNumber, setMonthStateIsNumber] = useState(true)

    const dayInputRef = useRef(null)
    const monthInputRef = useRef(null)
    const yearInputRef = useRef(null)

    useEffect(() => { //Sets the default state of day, month and year, when date becomes available
        if(!date) return
        const [year, month, day] = date.split('-')

        setDayState(day)
        setMonthState(month)
        setMonthDisplay(NumberToMonth(month))
        setYearState(year)
    }, [date]);

    // useEffect(() => { //When the page loads i get all elements that i need to disable when loadingProtector is mounted

    //     const buttons = document.querySelectorAll("button")
    //     setElementToDisable(buttons)

    // }, []);


    function HandleDayInput(day) {
        //Day is a number inside of string
        const dayString = day.toString()

        if (!isNaN(day)) {

            if (parseInt(dayString[0]) > 3)
                day = "3"
            if (parseInt(dayString[0]) === 3 && parseInt(dayString[1]) > 1)
                day = "31"

            setDayState(day)

        }

    }

    function InputDayBlur(day) {

        if (day === "0" || day === "00")
            day = "1"

        if (parseInt(day) <= 9)
            day = `0${day}`

        if (day === "")
            day = "30"

        setDayState(day)

        monthInputRef.current.focus()

    }

    function HandleMonthInput(month) {

        if (isNaN(month[0]))
            setMonthStateIsNumber(false)
        else
            setMonthStateIsNumber(true)

        if (!isNaN(month[0])) {

            let numericValue = month.replace(/\D/g, ''); // Remove non-digit characters

            if (numericValue.length < 3) {

                if (parseInt(numericValue[0]) === 1 && parseInt(numericValue[1]) > 2)
                    numericValue = "12"

                if (parseInt(numericValue[0]) > 1)
                    numericValue = `${parseInt(numericValue[0])}`

                setMonthState(numericValue)

                setMonthDisplay(numericValue)
            }
        } else {

            let letterValue = month.replace(/[^A-Za-z]/g, ''); // Remove non-letter characters

            letterValue = letterValue.toUpperCase()

            setMonthDisplay(letterValue)

            setMonthState(MonthToNumber(letterValue))

        }

    }

    function InputMonthBlur(month) {
        if (!isNaN(month[0])) {

            if (parseInt(month[0]) !== 0 && parseInt(month) < 10)
                month = `0${month}`

            if (month === "0" || month === "00" || month === "000")
                month = "01"

            if (month === "")
                month = "03"

            setMonthState(month)

            setMonthDisplay(NumberToMonth(month))
        }
        yearInputRef.current.focus()

    }

    function HandleYearInput(year) {

        if (!isNaN(year)) {

            if (parseInt(year[0]) === 0)
                year = 1
            if (parseInt(year[0]) === 1 && parseInt(year[1]) < 9)
                year = 19
            if (parseInt(year[0]) === 1 && parseInt(year[1]) === 9 && parseInt(year[2]) < 6)
                year = 196
            if (parseInt(year[0]) > 2)
                year = 2
            if (parseInt(year[0]) === 2 && parseInt(year[1]) > 0)
                year = 20
            if (parseInt(year[0]) === 2 && parseInt(year[1]) === 0 && parseInt(year[2]) > 2)
                year = 202
            if (parseInt(year[0]) === 2 && parseInt(year[1]) === 0 && parseInt(year[2]) === 2 && parseInt(year[3]) > 4)
                year = 2025

            setYearState(year)
        }

    }

    function InputYearBlur(year) {

        if (year === "") {
            year = 2013
            setYearState("2013")
        }

        if (monthStateIsNumber)
            setMonthDisplay(NumberToMonth(monthState))
        else
            setMonthDisplay(MonthToNumber(monthState))


        setDate(`${year}-${monthState}-${dayState}`)

        if (yearInputRef.current)
            yearInputRef.current.blur()

        notifToast("Changed the Date!", "top-left", 2000, "info")

    }

    function onEnterGoToTheNextElement(event) {
        if (event.key === "Enter") {

            if (event.target.id === "dayinput")
                InputDayBlur(dayState)

            if (event.target.id === "monthinput")
                InputMonthBlur(monthState)

            if (event.target.id === "yearinput")
                InputYearBlur(yearState)

        }
    }

    return <div className="boxshadow flex justify-between sticky top-0 z-50 px-2 sm:px-10 py-2 bg-gray-400">

        <div className="flex justify-center">
            <h1 onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="font-bold text-l cursor-pointer">
                {isPlayoff ? "PlayOff" : null}
                {isOffseason ? "Offseason" : null}
                {!isPlayoff && !isOffseason ? "Regular Season" : null}
            </h1>
        </div>

        <div className="items-center">
            <div id="dateInput" className="flex">

                <button
                    onMouseEnter={() => setArrowFillColorLeft("#70706e")}
                    onMouseLeave={() => setArrowFillColorLeft("none")}
                    onClick={() => {
                        setDate(Calendar(date, -1))
                        setArrowFillColorLeft("#000000")
                    }}
                    aria-label="Left"
                >
                    <svg className="transform rotate-180" xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24" fill={arrowFillColorLeft} stroke="#000000" strokeWidth="1.5" strokeLinecap="butt" strokeLinejoin="bevel"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                </button>

                <div className="flex bg-black text-[#FFFF00] cursor-pointer">
                    <input
                        type="text"
                        id="dayinput"
                        value={dayState}
                        ref={dayInputRef}
                        maxLength="2"
                        onClick={() => dayInputRef.current.select()}
                        onChange={e => HandleDayInput(e.target.value)}
                        onKeyDown={event => onEnterGoToTheNextElement(event)}
                        // onBlur={InputDayBlur(dayState)}
                        className="w-[20px] bg-black text-center font-bold text-md mx-1"
                    />
                    <input
                        type="text"
                        id="monthinput"
                        value={monthDisplay}
                        ref={monthInputRef}
                        maxLength="3"
                        onClick={() => monthInputRef.current.select()}
                        onChange={e => HandleMonthInput(e.target.value)}
                        onKeyDown={event => onEnterGoToTheNextElement(event)}
                        // onBlur={InputMonthBlur(monthState)}
                        className="w-[43px] text-center bg-black font-bold text-md"
                    />
                    <input
                        type="text"
                        id="yearinput"
                        value={yearState}
                        ref={yearInputRef}
                        maxLength="4"
                        onClick={() => yearInputRef.current.select()}
                        onChange={e => HandleYearInput(e.target.value)}
                        onKeyDown={event => onEnterGoToTheNextElement(event)}
                        // onBlur={InputYearBlur(yearState)}
                        className="w-[40px] bg-black ml-[2px] text-center font-bold text-md mx-1"
                    />
                </div>

                <button
                    onMouseEnter={() => setArrowFillColorRight("#70706e")}
                    onMouseLeave={() => setArrowFillColorRight("none")}
                    onClick={() => {
                        setDate(Calendar(date, 1))
                        setArrowFillColorRight("#000000")
                    }}
                    aria-label="Right"
                >
                    <svg className="" xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24" fill={arrowFillColorRight} stroke="#000000" strokeWidth="1.5" strokeLinecap="butt" strokeLinejoin="bevel"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                </button>

            </div>
        </div>

    </div >;
}

export default NavBar;
