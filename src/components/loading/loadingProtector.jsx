import React, { useEffect } from "react";
import LoadingCircle from "./loadingCircle.jsx";

function LoadingProtector() {

    useEffect(() => {

        const body = document.querySelector('html')

        body.classList.add('noscroll')

        document.querySelectorAll("#dateInput").forEach(e => e.classList.add("disable"))

        return () => {

            body.classList.remove('noscroll')

            document.querySelectorAll("#dateInput").forEach(e => e.classList.remove("disable"))
        };
    }, []);

    return <div className="w-screen h-screen absolute bg-gray-400/90 z-50 flex justify-center items-center">

        <LoadingCircle />

    </div>;
}

export default LoadingProtector;
