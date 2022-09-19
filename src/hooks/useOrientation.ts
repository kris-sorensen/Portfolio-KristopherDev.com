// import React, { useEffect, useState } from 'react';

// function useLayout() {
//     const [orientation, setOrientation] = useState({
//         landscape: true,
//     });
//     useEffect(() => {
//         // Handler to call on window resize
//         function handleOrientation() {

//             // Set window width/height to state
//             setOrientation({
                
//             });
//         }
//         // Add event listener
//         window.addEventListener("resize", handleOrientation);
//         // Call handler right away so state gets updated with initial window size
//         handleOrientation();
//         // Remove event listener on cleanup
//         return () => window.removeEventListener("resize", handleOrientation);
//     }, []); // Empty array ensures that effect is only run on mount
//     return orientation;
// }

// export default useLayout;