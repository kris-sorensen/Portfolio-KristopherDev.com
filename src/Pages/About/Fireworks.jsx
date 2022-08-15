import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { Points, Point, PointMaterial } from '@react-three/drei';
import { useFrame, extend } from '@react-three/fiber';
import PropTypes from 'prop-types';
import { useThree } from '@react-three/fiber';
import useStore from '../../hooks/useStore'
import { shaderMaterial } from '@react-three/drei';
import glsl from 'babel-plugin-glsl/macro.js';
import fireworksVertex from './shaders/About/fireworksVertex.glsl'
import fireworksFragment from './shaders/About/fireworksFragment.glsl'
import SemiTransparentLayer from './SemiTransparentLayer';



/* TODO:
//  * Different colors of fireworks 
//  * fireworks spawn at mouse location
//  * add gravity
//  * add opacity--
//  * dismount object when opacity hits zero (either pass a function and dismount or setup array in bear state library*this would be the best way)
//  * add Randomness to movement of points
 * firework flashes white before turning color
 * add click me button text that only shows itself after the 3 fireworks have had there go
*/



const Fireworks = ({ color, explodeHere }) => {
    const { power, gravity, particleSize, count, friction, opacity } = useStore()
    const { mouse, viewport, gl, clock } = useThree()
    const meshRef = useRef()
    // const matRef = useRef()
    // const stopEverything = useRef(false)

    let clockOffset = 0
    useEffect(() => {
        //offset Running clock so it starts at zero for each new firework
        clockOffset = clock.getElapsedTime()
        // console.log(clock)
        // const dismountInterval = setInterval(() => {
        //     if (!runFrame.current && !stopEverything.current) {
        //         stopEverything.current = true
        //         clearInterval(dismountInterval);
        //     }
        // }, 1000);
        // return () => {
        //     clearInterval(dismountInterval);
        // };
    }, []);



    let runFrame = useRef(true)
    let colorWhite = useRef(true)


    const positions = new Float32Array(count * 3)
    const velocities = new Float32Array(count)
    const index = new Float32Array(count)
    for (let i = 0; i < count; i++) {
        const i3 = i * 3
        //positions
        positions[i3] = (mouse.x * viewport.width) / 2
        positions[i3 + 1] = (mouse.y * viewport.height) / 2
        positions[i3 + 2] = 0
        //velocities
        velocities[i] = Math.random() * power
        // index
        index[i] = i
    }


    // //todo: add to useStore
    const angleIncrement = (Math.PI * 2) / count
    const points = useRef()
    useFrame((state) => {

        points.current.material.uniforms.uTime.value = state.clock.getElapsedTime() - clockOffset;
        // console.log(state.clock.getElapsedTime() - clockOffset)
        if (points.current.material.uniforms.uOpacity.value <= 0) {
            points.current.material.uniforms.uOpacity.value = 0
            points.current.visible = false;
        } else {
            points.current.material.uniforms.uOpacity.value -= .009;
        }
        points.current.material.uniforms.uFriction.value -= .003;
        // points.current.material.uniforms.uGravity.value -= .0035;


    })

    return (
        <>
            <mesh ref={meshRef}>
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
                            attach="attributes-aIndex"
                            count={index.length}
                            array={index}
                            itemSize={1}
                            usage={THREE.DynamicDrawUsage}
                        />
                    </bufferGeometry>
                    <fireworkMaterial vertexColors transparent uSize={particleSize * gl.getPixelRatio()} uAngleIncrement={angleIncrement} uFriction={friction} uGravity={gravity} />
                    {/* <pointsMaterial attach="material" vertexColors size={10} sizeAttenuation={false} /> */}
                </points>

            </mesh>
        </>
    );
};



Fireworks.propTypes = {
    color: PropTypes.any.isRequired,
    explodeHere: PropTypes.any,
};
// todo: 
// * rate of expansion needs to go down

const FireworkMaterial =
    shaderMaterial(
        {
            color: new THREE.Color(1., 0.0, 0.1),
            uSize: 1,
            uTime: .1,
            uAngleIncrement: 1,
            uGravity: 2.0,
            uFriction: 1,
            uOpacity: 1,
            uSpread: .25,
            uFireworkSize: 1,

        },

        // vertex shader
        glsl`
            uniform float uSize;
            uniform float uFriction;
            uniform float uGravity;
            uniform float uAngleIncrement;
            uniform float uTime;
            uniform float uSpread;
            uniform float uFireworkSize;
            
            attribute float aVelocities;
            attribute float aIndex;
            varying float vVelocity;
            varying vec2 vuv;

            varying vec3 vColor;
            varying vec2 vOriginalPosition;
            varying float vThrottle;
            

            void main(){
            /*
            * Position
            */
            vec4 modelPosition = modelMatrix * vec4(position, 1.0);
                vVelocity = aVelocities;

                //save original positions for place correction
                vOriginalPosition = position.xy;

                // Move particles out in a circular motion in random directions 
                modelPosition.x += ((cos(uAngleIncrement * aIndex)  * uSpread) * vVelocity - vOriginalPosition.x);
                modelPosition.y += ((sin(uAngleIncrement * aIndex) * uSpread) * vVelocity - vOriginalPosition.y);


                // Rate of Expansion
                modelPosition.xy *= (uTime * uFireworkSize);
                
                // Adjust positioning from (0,0) to event location
                modelPosition.x += vOriginalPosition.x;
                modelPosition.y += vOriginalPosition.y;

                // add Gravity
                vThrottle = .004;
                modelPosition.y -= pow(uTime, uGravity) * vThrottle;

                //Final
                vec4 viewPosition = viewMatrix * modelPosition;
                vec4 projectedPosition = projectionMatrix * viewPosition;
                gl_Position = projectedPosition;


            /*
            * Size
            */
            gl_PointSize = uSize;

            /*
            * Color
            */
            vColor = color;
            vuv = uv;

            }
  `,
        // fragment shader
        glsl`
            varying vec3 vColor;
            varying vec2 vuv;
            uniform float uOpacity;
            uniform float uTime;



            void main(){


                //Light point pattren (difuse point that fades faster)
                float strength = distance(gl_PointCoord, vec2(.5));
                strength = 1. - strength;
                strength = pow(strength, 10.);
                
                // Inital color flashes white and then goes to color
                float transitionColor = smoothstep(.25, .1, uTime);


                //Color
                //Blue
                // vec3 color = mix(vec3(transitionColor, transitionColor, 1.), vColor, strength);
                
                //Red
                vec3 color = mix(vec3(1., transitionColor, transitionColor), vColor, strength);
                //Purple
                // vec3 color = mix(vec3(1., transitionColor, 1.), vColor, strength);


                // glow color
                

                // gl_FragColor= vec4(color, 1.);
                gl_FragColor= vec4(color, uOpacity);
                // gl_FragColor = vec4(vuv, 1.0, uOpacity);
                        
            }`
    );


extend({ FireworkMaterial });



export default Fireworks;





