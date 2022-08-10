import { useControls, Leva } from 'leva';
import React, { Suspense } from 'react';
import { Sphere, useTexture, shaderMaterial, Plane, Text } from "@react-three/drei";
import { extend, useFrame, useThree } from '@react-three/fiber'
import * as THREE from "three";
import { Texture } from "three";
import glsl from 'babel-plugin-glsl/macro.js'



// const AtmosphereMaterial = shaderMaterial(
//     {},// vertex shader
//     glsl`
//     varying vec2 vUv;

//     void main(){
//          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
//         vUv = uv;
//     }
//   `,
//     // fragment shader
//     glsl`
//     varying vec2 vUv;

//     void main() {
//         float strength = step(.5,vUv.x);
//         float strength1 = step(.5,vUv.y );
//         gl_FragColor = vec4(strength, strength, strength, 1.0);
//     }
//   `
// )
const SplitMaterial = shaderMaterial(
    {},// vertex shader
    glsl`
    varying vec2 vUv;

    void main(){
         gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        vUv = uv;
    }
  `,
    // fragment shader
    glsl`
    varying vec2 vUv;
    
vec2 rotate(vec2 uv, float rotation, vec2 mid)
{
    return vec2(
      cos(rotation) * (uv.x - mid.x) + sin(rotation) * (uv.y - mid.y) + mid.x,
      cos(rotation) * (uv.y - mid.y) - sin(rotation) * (uv.x - mid.x) + mid.y
    );
}
    void main() {
vec2 rotateUv = rotate(vUv, 1.0, vec2(0.5));

        float strength = 1.0 - step(.55,vUv.x);
        float strength1 = 1.0 - step(.5,vUv.y);
        gl_FragColor = vec4(strength, strength, strength, 1.0);
    }
  `
)


// extend({ AtmosphereMaterial })
extend({ SplitMaterial })

function Title() {
    return (
        <>
            {/* <mesh>
                <Plane position={[0, 0, -1]} args={[16, 8, 1, 1]}>
                    <atmosphereMaterial />
                
                </Plane>
            </mesh> */}
            <mesh position={[0, 0, 1]}>
                <Text

                    fontSize={1.8}
                    maxWidth={400}
                    lineHeight={1}
                    letterSpacing={0.02}
                    textAlign={'center'}
                    font="https://fonts.gstatic.com/s/raleway/v14/1Ptrg8zYS_SKggPNwK4vaqI.woff"
                    anchorX="center"
                    anchorY="middle"
                >
                    <splitMaterial />hello!</Text>
            </mesh>
        </>
    );
}

export default Title;