import { Loader, OrbitControls, Effects } from "@react-three/drei";
import { Canvas } from '@react-three/fiber';
import React, { useEffect, useState, useLayoutEffect } from 'react';
import Fireworks from "./Fireworks";
import './styles/about.css';
import SemiTransparentLayer from './SemiTransparentLayer';
import Title from './Title';
import useStore from '../../hooks/useStore'

function AboutCanvas() {
    const [fireworks, setFireworks] = useState([])
    // const expendedFireworks = useStore((state) => state.expendedFireworks)
    // const resetExpendedFireworks = useStore((state) => state.resetExpendedFireworks)
    // const component = <Fireworks key={Date.now()} />
    // const addFirework = useStore((state) => state.addFirework(component))

    // useLayoutEffect(() => {
    //     console.log('length', fireworks.length, 'expended', expendedFireworks)
    //     if (expendedFireworks > 0 && fireworks.length > 0) {

    //         const removeFirework = () => {
    //             //todo: set in useCallback
    //             // setFireworks([
    //             //     ...fireworks.slice(expendedFireworks),
    //             // ]);
    //             resetExpendedFireworks();
    //             console.log('destroy array')
    //             setFireworks([])

    //         }
    //         if (fireworks.length === expendedFireworks) removeFirework()
    //         // removeFirework()
    //     }

    // }, [expendedFireworks])

    // const fireworks = useStore((state) => state.fireworks)


    // when opacity reaches 0 I want to trigger its removal from the array

    const handleClick = () => {
        setFireworks([...fireworks, <Fireworks key={Date.now()} />])
    }

    return (
        <div style={{ height: '95%', width: '100%' }} className="canvas-container">
            <Canvas onClick={handleClick} gl={{ autoClearColor: false, }} orthographic camera={{ zoom: 100, position: [0, 0, 5] }}>
                {/* <OrbitControls /> */}
                <SemiTransparentLayer />
                <Effects multisamping={8} renderIndex={1} disableGamma={false} disableRenderPass={false} disableRender={false}>
                </Effects>
                <Title />
                {/* {fireworks && (
                    { fireworks }
                )} */}
                {fireworks}
            </Canvas>
            <Loader />
        </div>
    );
}

export default AboutCanvas;