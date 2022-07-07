import React, {useState, useLayoutEffect} from 'react';


const useTabActive=(): boolean => {
    const [tabActive, setTabActive]=useState<boolean>(true);

    useLayoutEffect(() => {
        const handleVisibilityChange=(): void => {
            if(document.visibilityState=="visible") {
                setTabActive(!tabActive);
            } else {
                setTabActive(!tabActive);
            }
        };

        document.addEventListener("visibilitychange", handleVisibilityChange);

        return (): void => {
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };

    });

    return tabActive;

};

export default useTabActive;