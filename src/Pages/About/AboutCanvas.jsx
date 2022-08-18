import React, { useState, useEffect, Suspense } from 'react';
import { Loader, Effects } from "@react-three/drei";
import { Canvas, extend } from '@react-three/fiber';
import Fireworks from "./Fireworks";
import './styles/about.css';
import SemiTransparentLayer from './SemiTransparentLayer';
import Title from './Title';
import useInterval from '../../hooks/useInteveral'
import { useControls, Leva } from 'leva';
// import PreExplodedFirework from './PreExplodedFirework'
import { AfterimagePass } from "three-stdlib"
import fireworkSound from './audio/firework.mp3';
import fireworkSoundMobile from './audio/firework-mobile.mp3';
import useSound from 'use-sound';
import useWindowSize from '../../hooks/useWindowSize';

extend({ AfterimagePass });


function AboutCanvas() {
    const [fireworks, setFireworks] = useState([])
    const [colorArr] = useState([0x504DF4, 0x1738B7, 0xA76BFE])
    const [color, setColor] = useState(0)
    const [launchPositionsArr] = useState([[-4, 3], [3, 1.8], [.5, -2]])
    const [launchPosition, setLaunchPosition] = useState(0)
    const [isPlaying, setIsPlaying] = useState(true)
    const [isMobile, setIsMobile] = useState(null)
    const [delay] = useState(2000)
    const [play] = useSound(fireworkSound);
    const [playMobile] = useSound(fireworkSoundMobile);
    const { width } = useWindowSize()

    useEffect(() => {
        if (width < 1147) {
            setIsMobile(true)
        }
        else {
            setIsMobile(false)
        }
    }, [width])

    //Gui
    const transparentLayerParams = useControls({ opacity: { value: .3, min: 0.01, max: 1, step: .0001 } });

    // will need to send up light eventually that will go to firework spot and explode.
    // needs to be on interval so they don't all launch at same time. will pass position into handle click


    // onLoad launch 3 fireworks on interval
    useInterval(
        () => {
            if (isMobile) return null
            if (launchPosition >= launchPositionsArr.length) {
                setIsPlaying(false)
                return null
            }
            else {
                handleClick(launchPositionsArr[launchPosition])
                setLaunchPosition(launchPosition + 1)
            }
        },
        // Delay in milliseconds or null to stop it
        isPlaying ? delay : null,
    )

    const handleClick = (explodeHere) => {
        setFireworks([...fireworks, <Fireworks explodeHere={explodeHere} color={colorArr[color]} key={Date.now()} />])
        if (color >= colorArr.length - 1) {
            setColor(0)
        } else setColor(color + 1)
        if (isMobile) {
            playMobile()
        } else {
            play()

        }
    }

    return (
        <div style={{ height: '100%', width: '100%' }} className="canvas-container">
            <Leva hidden />
            <Canvas onClick={handleClick} gl={{ autoClearColor: false, }} orthographic camera={{ zoom: 100, position: [0, 0, 5] }}>
                <Suspense fallback={null}>
                    <SemiTransparentLayer renderIndex={-2} opacity={transparentLayerParams.opacity} />
                    {/* <OrbitControls /> */}
                    {/* <PreExplodedFirework /> */}
                    <Effects multisamping={0} renderIndex={-1} disableGamma={false} depthBuffer={true}>
                        <afterimagePass args={[0]} />
                    </Effects>

                    <Title />
                    {fireworks}
                </Suspense>
            </Canvas>
            <Loader />
        </div >
    );
}

export default AboutCanvas;