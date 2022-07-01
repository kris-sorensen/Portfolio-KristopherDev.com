import React, { useRef } from 'react';
import * as THREE from "three";
import { Texture } from "three";
import { extend, useFrame } from '@react-three/fiber'
import { Sphere, useTexture, shaderMaterial, PresentationControls } from "@react-three/drei";
import glsl from 'babel-plugin-glsl/macro.js'
import gsap from 'gsap'
import { useMousePosition } from '../../hooks/useMousePosition'
import useWindowResize from '../../hooks/useWindowResize'


//todo: add shadows to all parts
//todoL memo() useMousePosition
// add glowing point light like ghosts on haunted house that follows mouse?


const Earth = () => {
    //Custom Hooks
    const position = useMousePosition();
    const elementSize = useWindowResize();
    // Texture
    const map = useTexture('/nasaEarth.jpg')
    // Refs
    const earthRef = useRef()
    const meshRef = useRef()

    useFrame(() => {
        //Move Earth based on mouse location
        if (elementSize.mobile) return
        gsap.to(meshRef.current.rotation, {
            y: ((position.x / window.innerWidth) * 2 - 1) * 3.5, // Convert pixel location of mouse into Canvas location
            x: (-(position.y / window.innerHeight) * 2 + 1),
            duration: 3,
        })
    }, -2)

    useFrame(() => {
        // Slowly Rotate Earth
        earthRef.current.rotateY(.0015)
    }, -1)

    return (

        <PresentationControls polar={[-Math.PI * .5, Math.PI * .5]} snap={!elementSize.mobile} config={{ mass: 5, tension: 150, friction: 20 }} speed={2}>
            <mesh ref={meshRef}>
                <Sphere args={[elementSize.earthSize, 100, 100]} ref={earthRef}>
                    <atmosphereMaterial map={map} />
                </Sphere>
            </mesh>
        </PresentationControls >
    );
}


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

export default Earth;