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

/*TODO: Convert to Shader

Three.js variables before sending to shader:
    - mouse position of click event or auto firwork

Shader Material setting: 
    = vertexColors
    - transparent? if needed
    - bleding additive? or normal test both

Uniforms: 
    - size
    - colors array? (might create as attribute but better if not) might also be a varying.
    - opacity (fragment shader 4th value in vec4)
    = gravity
    - friction
- 

Varyings: 
- ? opacity reached where it turns white to color?+-*
- angleIncrement

Atributes: 
 - positions
 - Velocities


 Shader Math Needs:
    - distribute in a circle using angle increment and sin(x) and cos(y)

*/


const Fireworks = ({ color, explodeHere }) => {
    const { power, gravity, particleSize, count, friction, opacity } = useStore()
    const { mouse, viewport, gl, clock } = useThree()
    const meshRef = useRef()
    const matRef = useRef()
    const stopEverything = useRef(false)

    let clockOffset = 0
    useEffect(() => {
        //offset Running clock so it starts at zero for each new firework
        clockOffset = clock.getElapsedTime()
        // console.log(clock)
        const dismountInterval = setInterval(() => {
            if (!runFrame.current && !stopEverything.current) {
                stopEverything.current = true
                clearInterval(dismountInterval);
            }
        }, 1000);
        return () => {
            clearInterval(dismountInterval);
        };
    }, []);



    let runFrame = useRef(true)
    let colorWhite = useRef(true)

    // useFrame(() => {
    //     if (!stopEverything.current) {
    //         if (matRef.current.opacity <= 0 && meshRef.current.visible) {
    //             runFrame.current = false
    //             matRef.current.opacity = 0
    //             meshRef.current.visible = false
    //         }
    //         else if (runFrame.current) {
    //             // console.log(meshRef.current)
    //             matRef.current.opacity -= opacity
    //             if (matRef.current.opacity < .960) colorWhite.current = false
    //             // Move Points
    //             for (let i = 0; i < count; i++) {
    //                 //Add friction to slowdown fireworks over time
    //                 velocities[i] = velocities[i] * friction

    //                 const point = meshRef.current.children[0].children[i]
    //                 //Move x and y of points
    //                 point.position.x += ((Math.cos(angleIncrement * i)) * .01) * velocities[i]
    //                 point.position.y += ((Math.sin(angleIncrement * i)) * .01) * velocities[i] - gravity

    //                 // Change Firework from white to colors after initial flash of white. 
    //                 if (colorWhite.current) {
    //                     if (matRef.current.opacity <= .965) {
    //                         if (i % 10 === 0) {
    //                             point.children[0].color.setHex(0xffffff)
    //                         }
    //                         if (i % 6 === 0) {
    //                             point.children[0].color.setHex(0x504DF4)
    //                         }
    //                         if (i % 7 === 0) {
    //                             point.children[0].color.setHex(0x1738B7)
    //                         }
    //                         else {
    //                             point.children[0].color.setHex(color)
    //                         }
    //                     }
    //                 }
    //             }
    //         }
    //     }
    // })

    // let positions = [];

    // if (explodeHere instanceof Array) {
    //     positions = Array.from({ length: count }, (i) => [
    //         explodeHere[0],
    //         explodeHere[1],
    //         0
    //     ])
    // }
    // else {
    //     positions = Array.from({ length: count }, (i) => [
    //         // Get Spot of Mouse Click
    //         (mouse.x * viewport.width) / 2,
    //         (mouse.y * viewport.height) / 2,
    //         0
    //     ])
    //     // console.log('mouse explode here', positions)
    // }
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




    // Creates an array of random Velocities
    // const velocities = Array.from({ length: count }, (i) => [Math.random() * power])
    // //todo: add to useStore
    const angleIncrement = (Math.PI * 2) / count
    const points = useRef()
    useFrame((state) => {

        points.current.material.uniforms.uTime.value = state.clock.getElapsedTime() - clockOffset;
        if (points.current.material.uniforms.uOpacity.value <= 0) {
            points.current.material.uniforms.uOpacity.value = 0
            points.current.visible = false;
        } else {
            points.current.material.uniforms.uOpacity.value -= .0035;
        }

        // console.log(points.current)
        points.current.material.uniforms.uniformsNeedUpdate = true;
        points.current.geometry.verticesNeedUpdate = true
    })

    return (
        <>
            {/* <SemiTransparentLayer opacity={.1} /> */}
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
                    <fireworkMaterial vertexColors transparent uSize={6 * gl.getPixelRatio()} uAngleIncrement={angleIncrement} uFriction={friction} uGravity={gravity} />
                    {/* <pointsMaterial attach="material" vertexColors size={10} sizeAttenuation={false} /> */}
                </points>
                {/* <points position={[-4, 3, 0]} /> */}

                {/* <bufferGeometry> */}
                {/* <bufferAttribute attachObject={["attributes", "position"]} count={positions.length / 3} array={positions} itemSize={3} /> */}
                {/* <bufferAttribute attachObject={["attributes", "velocities"]} count={velocities.length} array={velocities} itemSize={1} /> */}
                {/* </bufferGeometry> */}
                {/* <PointMaterial blending={1} ref={matRef} vertexColors transparent size={particleSize} />
                    {positions.map((position, i) => (
                        <PointEvent key={i} color={'white'} position={position} />
                    ))} */}
                {/* </Points> */}
            </mesh>
        </>
    );
};

function PointEvent(props) {
    return (
        <mesh>
            <Point {...props} />
        </mesh>
    )
}

Fireworks.propTypes = {
    color: PropTypes.any.isRequired,
    explodeHere: PropTypes.any,
};


/*TODO: Convert to Shader

Three.js variables before sending to shader:
    - mouse position of click event or auto firwork

Shader Material setting: 
    = vertexColors
    - transparent? if needed
    - bleding additive? or normal test both

Uniforms: 
    - size
    - colors array? (might create as attribute but better if not) might also be a varying.
    - opacity (fragment shader 4th value in vec4)
    - power (is this needed or only intially?)
    = gravity
    - friction
- 

Varyings: 
- ? opacity reached where it turns white to color?+-*
- angleIncrement

Atributes: 
 - positions
 - Velocities


 Shader Math Needs:
    - distribute in a circle using angle increment and sin(x) and cos(y)

*/

// default might need to be zero
const FireworkMaterial =
    shaderMaterial(
        {
            color: new THREE.Color(1., 0.0, 0.1),
            uSize: 1,
            uTime: 0,
            uAngleIncrement: 1,
            uGravity: 1,
            uFriction: 1,
            uOpacity: 1,

        },

        // vertex shader
        glsl`
            uniform float uSize;
            uniform float uFriction;
            uniform float uGravity;
            uniform float uAngleIncrement;
            uniform float uTime;
            attribute float aVelocities;
            attribute float aIndex;
            varying float vVelocity;
            varying vec2 vUv;

            varying vec3 vColor;

            void main(){
            /*
            * Position
            */
            vec4 modelPosition = modelMatrix * vec4(position, 1.0);
                vVelocity = aVelocities;
                vVelocity *= (uFriction - (uTime *.01));
                // modelPosition.xyz = modelPosition.xyz * vVelocity;
                modelPosition.x += (cos(uAngleIncrement * aIndex) * .5) * vVelocity;
                modelPosition.y += (sin(uAngleIncrement * aIndex) * .5) * vVelocity - (uGravity * uTime *.7);

                modelPosition.xy *= uTime;

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
            vUv = uv;

            }
  `,
        // fragment shader
        glsl`
            varying vec3 vColor;
            varying vec2 vUv;
            uniform float uOpacity;



            void main(){


                // //Light point pattren (difuse point that fades faster)
                float strength = distance(gl_PointCoord, vec2(.5));
                strength = 1. - strength;
                strength = pow(strength, 10.);

                //Final
                //Blue
                // vec3 color = mix(vec3(0., 0., 1.), vColor, strength);
                //Red
                // vec3 color = mix(vec3(1., 0., 0.), vColor, strength);
                //Purple
                vec3 color = mix(vec3(1., 0., 1.), vColor, strength);

                // gl_FragColor= vec4(color, 1.);
                gl_FragColor= vec4(color, uOpacity);
                // gl_FragColor= vec4(vec3(1.,0.,0.),vec3(0.,0.,1) uOpacity);
                // gl_FragColor = vec4(vUv, 1.0, uOpacity);
                        
            }`
    );


extend({ FireworkMaterial });



export default Fireworks;





