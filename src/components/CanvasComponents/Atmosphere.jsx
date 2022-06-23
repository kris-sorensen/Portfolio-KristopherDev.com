import React from 'react';
import * as THREE from "three";
import { extend } from '@react-three/fiber'
import { Sphere, shaderMaterial } from "@react-three/drei";
import { useControls } from 'leva';
import glsl from 'babel-plugin-glsl/macro.js'

const OuterAtmosphereMaterial = shaderMaterial(
    { blending: THREE.AdditiveBlending, side: THREE.BackSide },
    // vertex shader
    glsl`
    varying vec3 vertexNormal;

    void main(){
        vertexNormal = normal;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); // boiler plate code
    }
  `,
    // fragment shader
    glsl`
    varying vec3 vertexNormal;

    void main() {
        // intesity of atmospheric effect
        float intensity = pow(.2 - dot(vertexNormal, vec3(0.0, 0.0, 1.0)),2.0);
        // atmospheric glow
        vec3 atmosphere = vec3(0.3,0.6,1.0)* pow(intensity, 1.0);

        gl_FragColor = vec4(0.3,0.6,1.0,1.0) * intensity;
    }
  `

)

extend({ OuterAtmosphereMaterial })

const Atmosphere = () => {

    const atmosphereParams = useControls({
        radius: { value: 9.5, min: .05, max: 30, step: .5 },
        scale: { value: 1.4, min: 0, max: 2, step: .01 }

    })
    return (
        <mesh>
            <Sphere args={[atmosphereParams.radius, 30, 30]} scale={atmosphereParams.scale} >
                <outerAtmosphereMaterial />
            </Sphere>
        </mesh>
    );
}

export default Atmosphere;