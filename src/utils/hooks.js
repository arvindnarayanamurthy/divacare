import {useEffect, useState} from "react";
import theme from "../../theme/default";

const useDetectScreen = () => {
    const [width, setWidth] = useState();
    const handleWindowSizeChange = () => {
        setWidth(window.innerWidth);
    };

    useEffect(() => {
        setWidth(window.innerWidth);
        window.addEventListener("resize", handleWindowSizeChange);
        return () => {
            window.removeEventListener("resize", handleWindowSizeChange);
        };
    }, []);

    return {
        isPhone: width <= +theme.screens.md.replace("px", "")
    };
};

export default useDetectScreen;
