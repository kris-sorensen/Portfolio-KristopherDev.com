import React, { useState, useEffect, Suspense, useRef } from 'react';
import { Loader, Effects } from "@react-three/drei";
import { Canvas, extend, useFrame, useThree } from '@react-three/fiber';
import Fireworks from "./Fireworks";
import './styles/home.css';
import SemiTransparentLayer from './SemiTransparentLayer';
import HomeContent from './HomeContent';
import useInterval from '../../hooks/useInteveral'
import { useControls, Leva } from 'leva';
// import PreExplodedFirework from './PreExplodedFirework'
import { AfterimagePass } from "three-stdlib"
import fireworkSound from './audio/firework.mp3';
import fireworkSoundMobile from './audio/firework-mobile.mp3';
import useSound from 'use-sound';
import useWindowSize from '../../hooks/useWindowSize';
import useScrollPosition from '../../hooks/useScrollPosition'
// import Techstack from '../TechstackSimple/Techstack';
// import Techstack from '../Techstack/Techstack';
import About from '../About/About'

import Test from '../test'

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
                launchFirework(launchPositionsArr[launchPosition])
                setLaunchPosition(launchPosition + 1)
            }
        },
        // Delay in milliseconds or null to stop it
        isPlaying ? delay : null,
    )

    const launchFirework = (explodeHere) => {
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
        <>
            <div style={{ width: '100%', height: '100vh', position: 'fixed', top: 0, left: 0, outline: 'none' }} >
                <Leva hidden />
                <Canvas onClick={launchFirework} gl={{ autoClearColor: false, antialias: false }} orthographic camera={{ zoom: 100, position: [0, 0, 5] }}>
                    <Suspense fallback={Loader}>
                        <Test />
                        <Camera />
                        <SemiTransparentLayer renderIndex={-2} opacity={transparentLayerParams.opacity} />
                        {/* <OrbitControls /> */}
                        {/* <PreExplodedFirework /> */}
                        <Effects multisamping={0} renderIndex={-1} disableGamma={false} depthBuffer={true}>
                            <afterimagePass args={[0]} />
                        </Effects>

                        {/* <Techstack /> */}
                        {/* <HomeContent /> */}
                        <About />
                        {fireworks}
                    </Suspense>
                </Canvas>
                <Loader />
            </div>
        </>
    );
}

const Camera = () => {

    const scrollPosition = useScrollPosition();
    const { height } = useWindowSize()
    const { camera, gl, viewport } = useThree()
    const initalLoad = useRef(true)

    // Move camera onScroll
    useFrame(() => {
        camera.position.y = - scrollPosition / height * viewport.height
    })

    // Disable transparent layer when scrolling. If enabled meshes will streak
    useEffect(() => {
        if (!initalLoad.current) {
            gl.autoClearColor = true
            return () => gl.autoClearColor = false
        } else {
            initalLoad.current = false
        }
    }, [scrollPosition])

    return null
}
export default AboutCanvas;

