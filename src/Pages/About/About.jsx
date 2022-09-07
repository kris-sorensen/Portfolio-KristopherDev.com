import React, { useRef, useState, useEffect } from 'react';
import './styles/about.css'
import Navbar from '../Portals/Navbar';
import { Canvas, extend, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useControls } from 'leva';
import * as THREE from 'three';
import { Flex, Box } from '@react-three/flex'

// * Particles
import ParticleMaterial from '../../shaders/particle';
extend({ ParticleMaterial })
import createParticleAttributes from './util/createParticleAttributes'
import { useThree } from '@react-three/fiber';





const About = () => {
    const [isHovered, setIsHovered] = useState(false)
    const btn = useRef()


    const handleHover = () => {
        if (!isHovered) {
            setIsHovered(true)
            btn.current.style.backgroundColor = '#724BCC'
            btn.current.style.color = 'black'
            btn.current.style.cursor = 'pointer'
            btn.current.style.padding = '2rem 8rem'
        } else {
            setIsHovered(false)
            btn.current.style.backgroundColor = 'black'
            btn.current.style.color = '#f06682'
            btn.current.style.padding = '2rem 6rem'
        }
    }

    return (
        <>
            {/* <AboutCanvas /> */}
            {/* <Navbar /> */}
            {/* <div className="empty" style={{ width: '100%', height: '100vh' }}></div> */}
            <div id='about' style={{ width: '100%', height: '100vh' }} className="about">
                <div className="wrap" style={{
                    flexDirection: 'column', display: 'flex', justifyContent: 'center', alignItems: 'center', alignText: 'center',
                    width: '100%', height: '100%', zIndex: '3000'
                }}>
                    <div className="name" style={{ fontSize: '70px', color: '#526cef', margin: '0 0 .7rem 0' }}>
                        Kristopher Sorensen
                    </div>
                    <div className="title" style={{ fontSize: '40px', margin: '1rem 0', color: '#ef525f' }}>SOFTWARE ENGINEER</div>
                    <div className="description" style={{ lineHeight: "150%", width: '70rem', fontSize: '16px', margin: '4rem 0 6rem 0', color: 'white', display: 'inline-block' }}><p>Hello and welcome to my site! I am a Software Engineer with 7+ years of experience creating memorable, and beautiful web experiences that captivate and engage guests.
                    </p><br /><p>
                            I love playing with the newest technologies. Especially technologies that can be used to enhance user experience and improve performance. I feel that a website should be performant, emotionally engaging, and memorable. There is no greater joy to me than seeing a users face light up as they interact with my software.</p>
                        <br />
                        <blockquote style={{ margin: '0 5rem' }}><i><q>Design must seduce, shape, and perhaps more importantly, evoke an emotional response.</q> April Grieman</i></blockquote>
                    </div>


                    <button ref={btn} onMouseEnter={handleHover} onMouseLeave={handleHover} style={{ fontSize: '25px', backgroundColor: 'black', border: '1px solid #724BCC', color: '#e66565', padding: '2rem 6rem', transition: 'all 1.75s ease', borderRadius: '2px' }}>Techstack</button>
                </div>
            </div>
        </>
    );
}


const AboutCanvas = () => {



    return (
        <Canvas gl={{ alpha: true }} >
            <Points />
            <OrbitControls />
        </Canvas>
    )
}

const Points = () => {
    const points = useRef();
    const { gl, clock } = useThree()
    // * clock
    let clockOffset = 0
    useEffect(() => {
        //used to offset clock so it starts at zero for each new firework
        clockOffset = clock.getElapsedTime()
    }, []);

    // * animation loop
    useFrame(() => {
        points.current.material.uniforms.uTime.value = clock.getElapsedTime() - clockOffset;
    })


    /*
     * Attributes
        [ ] random velocities/speeds that will be used in pow( function to determine) -1.7 - 1.7 play with numbers
        [ ] random speeds
        [ ] colors if there are particles of differnt colors ?
        [ ] positions. start out all close to each other on left side centered in middle vertically and edge of left side for x

    * uniforms
        [ ] uTime = 0. add useFrame for updating time every frame
        [ ] uSize ? or just in Points? should I add randomness
        [ ] uFadeStart
        [ ] uFadeEnd
        [ ] uResetPoint

        ?shape particles into glowing lights with smoothstep
       
        
        // move particle to rigth
        x = x * uTime * aSpeeds
        // reset particle location when it reaches end
        x = mod(x, uResetPoint) // maybe divide by 10
        // shape graph 
        y = -pow(x * aVelocity, uStrength)
        
        todo: adjust for different pixel densities

        FRAG
        
        todo: shape particles. try with and without

        // add to X direction
        alpha = x * uTime * aSpeed
        // reset opacity when reaches 1. syncrozined with position
        alpha = mod(alpha, uResetPoint) / uResetPoint   // might be 1 or different value instead of 10.
        // only start fading particle at end of movement
        alpha = smoothstep(alpha, uFadeStart, uFadeEnd)


        todo:
            [ ] create attributes,


        */


    const pointsParams = useControls({
        count: { value: 10000, min: 100, max: 100000, step: 1 },
        velocitiesMax: { value: 1.7, min: 0, max: 3, step: .001 },
        velocitiesMin: { value: -1.7, min: -3, max: 0, step: .001 },
        x: { value: 0, min: -10, max: 10, step: .001 }, //? should it have a slight random scatering
        y: { value: 0, min: -10, max: 10, step: .001 },
        speedMax: { value: 1, min: -1, max: 10, step: .01 },
        speedMin: { value: 0, min: -1, max: 10, step: .01 },
    });

    const uniformParams = useControls({
        particleSize: { value: 10, min: 0.0001, max: 1, step: .0001 },
        uFadeStart: { value: .8, min: 0, max: 1, step: .01 },
        uFadeEnd: { value: 1, min: 0, max: 1, step: .01 }, //?
        uResetPoint: { value: 10, min: 1, max: 10, step: .01 }, //?
        uStrength: { value: 1.7, min: 1, max: 10, step: .01 }, //?
    })


    const { positions, speeds, velocities } = createParticleAttributes(pointsParams)



    return (
        <mesh>
            <points ref={points}>
                <bufferGeometry attach="geometry">
                    <bufferAttribute
                        attach="attributes-position"
                        count={positions.length / 3}
                        array={positions}
                        itemSize={3}
                        usage={THREE.DynamicDrawUsage}
                    />
                    <bufferAttribute
                        attach="attributes-aVelocities"
                        count={velocities.length}
                        array={velocities}
                        itemSize={1}
                        usage={THREE.DynamicDrawUsage}
                    />
                    <bufferAttribute
                        attach="attributes-aSpeeds"
                        count={speeds.length}
                        array={speeds}
                        itemSize={1}
                        usage={THREE.DynamicDrawUsage}
                    />
                </bufferGeometry>
                <particleMaterial depthWrite={false} transparent uSize={uniformParams.particleSize * gl.getPixelRatio()} uStrength={uniformParams.uStrength} uResetPoint={uniformParams.uResetPoint} />
            </points>
        </mesh>
    )
}

export default About
