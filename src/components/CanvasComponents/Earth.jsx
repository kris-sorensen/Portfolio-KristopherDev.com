import React, { useRef, useEffect } from 'react';
import * as THREE from "three";
import { Texture } from "three";
import { extend, useFrame, useThree } from '@react-three/fiber'
import { Sphere, useTexture, shaderMaterial } from "@react-three/drei";
import { useControls } from 'leva';
import glsl from 'babel-plugin-glsl/macro.js'
import gsap from 'gsap'


//todo: add shadows to all parts


const AtmosphereMaterial = shaderMaterial(
    { map: new Texture(), color: new THREE.Color(0.2, 0.0, 0.1) },
    // vertex shader
    glsl`
    varying vec2 vertexUV;
    varying vec3 vertexNormal;

    void main(){
        vertexUV = uv;
        vertexNormal = normalize(normalMatrix * normal);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); // boiler plate code
    }
  `,
    // fragment shader
    glsl`
    uniform sampler2D map;

    varying vec2 vertexUV;
    varying vec3 vertexNormal;

    void main() {
        // intesity of atmospheric effect
        float intensity = 1.25 - dot(vertexNormal, vec3(0.3, 0.6, 1.0));
        // atmospheric glow
        vec3 atmosphere = vec3(0.3,0.6,1.0)* pow(intensity, 1.5);

        gl_FragColor = vec4(atmosphere + texture2D(map, vertexUV).xyz, 1.0);
    }
  `

)

extend({ AtmosphereMaterial })

const Earth = () => {
    const map = useTexture('/nasaEarth.jpg')

    const mouse = useThree()

    const shaderRef = useRef()
    const earthRef = useRef()
    const meshRef = useRef()

    const meshParams = useControls({
        // radius: { value: 20, min: .05, max: 10, step: .5 },
    })
    const earthParams = useControls({
        radius: { value: 9.5, min: .05, max: 30, step: .5 },

    })

    useEffect(() => {
        earthRef.current.rotation.x = Math.PI * .2
        earthRef.current.rotation.y = Math.PI * -.1
        // console.log('hit useEffect')


    }, [])

    useFrame(() => {
        // console.log('hit useFrame')
        meshRef.current.rotateY(.001)
        gsap.to(meshRef.current.rotation, {
            y: mouse.mouse.x * .3,
            x: -mouse.mouse.y * .5,
            duration: 3,
        })

    })



    return (
        <mesh ref={meshRef}>
            <Sphere args={[earthParams.radius, 50, 50]} ref={earthRef}>
                <atmosphereMaterial map={map} ref={shaderRef} />
            </Sphere>
        </mesh>
    );
}

export default Earth;