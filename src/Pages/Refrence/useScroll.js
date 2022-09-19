import useWindowSize from '../../hooks/useWindowSize';
import useScrollPosition from '../../hooks/useScrollPosition';
import { useEffect, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';

const useScroll = () => {

    const scrollPosition = useScrollPosition();
    const { height } = useWindowSize();
    const { camera, gl, viewport } = useThree()
    const initalLoad = useRef(true);

    // Move camera onScroll
    useFrame(() => {
        camera.position.y = - scrollPosition / height * viewport.height;
    });

    // Disable transparent layer when scrolling. If enabled meshes will streak
    useEffect(() => {
        if (!initalLoad.current) {
            gl.autoClearColor = true;
            return () => gl.autoClearColor = false;
        } else {
            initalLoad.current = false;
        }
    }, [scrollPosition]);

    return null;
};

export default useScroll;