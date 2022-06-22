import React, { useEffect } from 'react';
import { useThree } from "@react-three/fiber";

const CameraContainer = () => {
    //Camera
    const camera = useThree((state) => state.camera)

    useEffect(() => {
        camera.position.z = 50
        camera.fov = 45

    }, [])


    return (
        <></>
    );

}
export default CameraContainer;