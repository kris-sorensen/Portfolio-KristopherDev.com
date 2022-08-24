import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { useFrame, extend, useThree } from '@react-three/fiber';
import PropTypes from 'prop-types';
// import { useThree } from '@react-three/fiber';
// import useStore from '../../hooks/useStore'
import { Circle, shaderMaterial } from '@react-three/drei';
import glsl from 'babel-plugin-glsl/macro.js';
import createSpiralAttribute from './util/createSpiralAttributes'
import { SphereBufferGeometry } from 'three';
import { Plane } from '@react-three/drei';


const Spiral = () => {
    const { gl, clock } = useThree()
    const mesh = useRef()
    const points = useRef()

    const { positions, colors, scales, randomness } = createSpiralAttribute()

    let clockOffset = 0
    useEffect(() => {
        clockOffset = clock.getElapsedTime()
    }, []);

    useFrame(() => {
        // console.log(points.current)
        // points.current.material.uniforms.uTime.value = clock.getElapsedTime() - clockOffset;
        // points.current.material.uniforms.uTime.value = clock.getElapsedTime();
    })

    return (
        <>
            <mesh ref={mesh}>
                <Plane ref={points} args={[4, 4, 100, 100]} >
                    <spiralMaterial />
                </Plane>
                {/* <points ref={points}>
                    <bufferGeometry attach="geometry">
                        <bufferAttribute
                            attach="attributes-position"
                            count={positions.length / 3}
                            array={positions}
                            itemSize={3}
                            usage={THREE.DynamicDrawUsage}
                        />
                        <bufferAttribute
                            attach="attributes-color"
                            count={colors.length / 3}
                            array={colors}
                            itemSize={3}
                            usage={THREE.DynamicDrawUsage}
                        />
                        <bufferAttribute
                            attach="attributes-aScale"
                            count={scales.length}
                            array={scales}
                            itemSize={1}
                            usage={THREE.DynamicDrawUsage}
                        />
                        <bufferAttribute
                            attach="attributes-aRandomness"
                            count={randomness.length / 3}
                            array={randomness}
                            itemSize={3}
                            usage={THREE.DynamicDrawUsage}
                        />
                    </bufferGeometry>

                    <spiralMaterial vertexColors depthWrite={false} blending={THREE.AdditiveBlending} uSize={8 * gl.getPixelRatio()} />
                </points> */}
                {/* <sphereBufferGeometry args={[.01, 10, 10]} />
                <meshBasicMaterial color={'black'} /> */}
            </mesh>
        </>
    );
};



Spiral.propTypes = {

};

const SpiralMaterial =
    shaderMaterial(
        {
            uSize: 8,
            uTime: 0,
            uSpeed: .1,
        },

        // vertex shader
        glsl`
        // uniform float uSize;
        uniform float uTime;
        uniform float uSpeed;

        // attribute float aScale;
        // attribute vec3 aRandomness;

        // varying vec3 vColor;
        varying vec2 vuv;

        void main(){
            /*
            * Position
            */
            vec4 modelPosition = modelMatrix * vec4(position, 1.0); 
            // spin
            // float angle = atan(modelPosition.x, modelPosition.z); // if not at middle of screen you will have to do offset calculation

            // randomness
            // modelPosition.xyz += aRandomness;
         
            // float distanceToCenter =  length(modelPosition.xz);
            // float angleOffset = (1. / distanceToCenter) * uTime * uSpeed; 
            // 1. / makes inside rotate slower than outside. WO it will do opposite
            
            // angle += angleOffset;
            // modelPosition.x = cos(angle) * distanceToCenter;
            // modelPosition.z = sin(angle) * distanceToCenter;


            vec4 viewPosition = viewMatrix * modelPosition;
            vec4 projectedPosition = projectionMatrix * viewPosition;


            gl_Position = projectedPosition;


            /*
            * Size
            */
            //aScale gives a random assortment of size particles. Being passed down with an attribute of random values from 0-1
            // gl_PointSize = uSize;

            // gl_PointSize *= (1. / -viewPosition.z);

            /*
            * Color
            */
            // vColor = color;
            vuv = uv;

        }`,
        // fragment shader
        glsl`
        // varying vec3 vColor;
        varying vec2 vuv;
        varying float colorR;
        varying float colorG;


        void main(){
            //Disc
            // float strength = distance(gl_PointCoord, vec2(.5));
            // strength = 1. - step(.5,strength);

            //Difuse point
            // float strength = distance(gl_PointCoord, vec2(.5));
            // strength *= 2.;
            // strength = 1. - strength;

            //Light point pattren (difuse point that fades faster)
            // float strength = distance(gl_PointCoord, vec2(.5));
            // strength = 1. - strength;
            // strength = pow(strength, 10.);

            float color = step(sin(vuv.x * 100.), vuv.x);
            // color = step(color, .5);
            // float colorG = step((1. + cos(vuv.x))* .5, vuv.x);

            // float color = colorR * colorG;

            //Final
            // vec3 color = mix(vec3(.0), vColor, strength);

            // gl_FragColor= vec4(color, 1.);
            gl_FragColor= vec4(vec3(color), 1.);
            // gl_FragColor= vec4(vec3(1.), 1.);
            
        }`
    );

// const SpiralMaterial =
//     shaderMaterial(
//         {
//             uSize: 8,
//             uTime: 0,
//             uSpeed: .1,
//         },

//         // vertex shader
//         glsl`
//         uniform float uSize;
//         uniform float uTime;
//         uniform float uSpeed;

//         attribute float aScale;
//         attribute vec3 aRandomness;

//         varying vec3 vColor;

//         void main(){
//             /*
//             * Position
//             */
//             vec4 modelPosition = modelMatrix * vec4(position, 1.0); 
//             // spin
//             float angle = atan(modelPosition.x, modelPosition.z); // if not at middle of screen you will have to do offset calculation

//             // randomness
//             modelPosition.xyz += aRandomness;

//             float distanceToCenter =  length(modelPosition.xz);
//             float angleOffset = (1. / distanceToCenter) * uTime * uSpeed; 
//             // 1. / makes inside rotate slower than outside. WO it will do opposite

//             angle += angleOffset;
//             modelPosition.x = cos(angle) * distanceToCenter;
//             modelPosition.z = sin(angle) * distanceToCenter;


//             vec4 viewPosition = viewMatrix * modelPosition;
//             vec4 projectedPosition = projectionMatrix * viewPosition;


//             gl_Position = projectedPosition;


//             /*
//             * Size
//             */
//             //aScale gives a random assortment of size particles. Being passed down with an attribute of random values from 0-1
//             gl_PointSize = uSize * aScale;
//             // size attenuation adjustment formula
//             gl_PointSize *= (1. / -viewPosition.z);

//             /*
//             * Color
//             */
//             vColor = color;


//         }`,
//         // fragment shader
//         glsl`
//         varying vec3 vColor;

//         void main(){
//             //Disc
//             // float strength = distance(gl_PointCoord, vec2(.5));
//             // strength = 1. - step(.5,strength);

//             //Difuse point
//             // float strength = distance(gl_PointCoord, vec2(.5));
//             // strength *= 2.;
//             // strength = 1. - strength;

//             //Light point pattren (difuse point that fades faster)
//             float strength = distance(gl_PointCoord, vec2(.5));
//             strength = 1. - strength;
//             strength = pow(strength, 10.);

//             //Final
//             vec3 color = mix(vec3(.0), vColor, strength);

//             gl_FragColor= vec4(color, 1.);

//         }`
//     );


extend({ SpiralMaterial });



export default Spiral;