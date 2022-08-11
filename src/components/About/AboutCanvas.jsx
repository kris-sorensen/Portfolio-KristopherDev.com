import { Loader, OrbitControls, Effects } from "@react-three/drei";
import { Canvas } from '@react-three/fiber';
import React, { useEffect, useState, useLayoutEffect, useRef } from 'react';
import Fireworks from "./Fireworks";
import './styles/about.css';
import SemiTransparentLayer from './SemiTransparentLayer';
import Title from './Title';
import useStore from '../../hooks/useStore'
import useInterval from '../../hooks/useInteveral'
import { useControls, Leva } from 'leva';





// TODO:
/*
* add smoothness (multisampling?) to text or see if there is a native property

*/

function AboutCanvas() {
    const [fireworks, setFireworks] = useState([])


    // onLoad setoff 3 firworks on interval with specific cordinates. if param is defined (position) I ignore mouse location and use param position instead. will launch in left right corner and under black of hello.
    // will need to send up light eventually that will go to firework spot and explode.
    // needs to be on interval so they don't all launch at same time. will pass position into handle click
    // after launch change shader so hello is revealed (maybe flicker it first, same with click me)

    // const [currentFirework, setCurrentFirework] = useState(0) // make state? useState?
    const [launchPositionsArr] = useState([[-4, 3], [3, 1.8], [.5, -1]])
    const [launchPosition, setLaunchPosition] = useState(0)
    const [isPlaying, setIsPlaying] = useState(true)
    const [delay] = useState(1500)

    // let onLoadLaunch;
    useInterval(
        () => {
            // Your custom logic here
            if (launchPosition >= launchPositionsArr.length) {
                setIsPlaying(false)
            } else {
                handleClick(launchPositionsArr[launchPosition])
                setLaunchPosition(launchPosition + 1)
            }
        },
        // Delay in milliseconds or null to stop it
        isPlaying ? delay : null,
    )



    const transparentLayerParams = useControls({
        opacity: { value: .12, min: 0.001, max: 1, step: .0001 },
    });


    const [colorArr] = useState([0x504DF4, 0x1738B7, 0xA76BFE])
    const [color, setColor] = useState(0)


    const handleClick = (explodeHere) => {

        setFireworks([...fireworks, <Fireworks explodeHere={explodeHere} color={colorArr[color]} key={Date.now()} />])
        if (color >= colorArr.length - 1) {
            setColor(0)
        } else setColor(color + 1)
    }

    return (
        <div style={{ height: '95%', width: '100%' }} className="canvas-container">
            <Canvas onClick={handleClick} gl={{ autoClearColor: false, }} orthographic camera={{ zoom: 100, position: [0, 0, 5] }}>
                {/* <OrbitControls /> */}
                <Leva hidden />
                <SemiTransparentLayer opacity={transparentLayerParams.opacity} />
                <Effects multisamping={8} renderIndex={1} disableGamma={false} disableRenderPass={false} disableRender={false}>
                </Effects>
                <Title />
                {fireworks}
            </Canvas>
            <Loader />
        </div>
    );
}

export default AboutCanvas;