import { useEffect, useState } from "react";
import useWindowSize from "../../../hooks/useWindowSize";


const useSizing = () => {
    const { width, height } = useWindowSize();

    useEffect(() => {

    }, [width, height]);

    return;
};


export default useSizing;