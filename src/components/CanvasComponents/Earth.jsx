import React, { useRef, useEffect, useContext } from 'react';
import * as THREE from "three";
import { Texture } from "three";
import { extend, useFrame, useThree } from '@react-three/fiber'
import { Sphere, useTexture, shaderMaterial } from "@react-three/drei";
import { useControls } from 'leva';
import glsl from 'babel-plugin-glsl/macro.js'
import gsap from 'gsap'
import radiusContext from '../../App'

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
    const [earthRadius, setEarthRadius] = useContext(radiusContext)

    useThree(({ camera }) => {
        camera.position.z = 50;
        camera.fov = 45
    });

    // Texture
    const map = useTexture('/nasaEarth.jpg')
    // UseThree for Mouse
    const mouse = useThree()
    // Refs
    const earthRef = useRef()
    const meshRef = useRef()
    // GUI
    const earthParams = useControls({
        radius: { value: 9.5, min: .05, max: 30, step: .5 },
        rotateSpeed: { value: .001, min: 0, max: .01, step: .001 },
    })
    console.log('controls', useControls)
    console.log('context', earthRadius)
    // Turn Earth to correct position Onload
    useEffect(() => {
        // earthRef.current.rotation.x = Math.PI * .2
        // earthRef.current.rotation.y = Math.PI * -.1
    }, [])

    useFrame(() => {
        //Move Earth based on mouse location
        gsap.to(meshRef.current.rotation, {
            y: mouse.mouse.x * 4.5,
            x: -mouse.mouse.y * .7,
            duration: 3,
        })

        // Slowly Rotate Earth
        earthRef.current.rotateY(.0015)
    })

    return (
        <mesh ref={meshRef}>
            <Sphere args={[earthParams.radius, 100, 100]} ref={earthRef}>
                <atmosphereMaterial map={map} />
            </Sphere>
        </mesh>
    );
}

export default Earth;