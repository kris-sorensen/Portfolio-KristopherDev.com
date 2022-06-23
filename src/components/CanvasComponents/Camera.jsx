import React, { useEffect } from 'react';
import { useThree } from "@react-three/fiber";

// todo: need to set camera differently? possibly in earth or starzs

const CameraContainer = () => {
    //Camera
    // const camera = useThree((state) => state.camera)

    // useEffect(() => {
    //     camera.position.z = 50
    //     camera.fov = 45
    // }, [])
    useThree(({ camera }) => {
        camera.position.set(0, 0, 50);
    });

    return (
        <></>
    );

}
export default CameraContainer;