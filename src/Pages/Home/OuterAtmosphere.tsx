import React from 'react';
import * as THREE from "three";
import {extend, MeshProps, Object3DNode} from '@react-three/fiber';
import {Sphere, shaderMaterial} from "@react-three/drei";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore: Unreachable code error
import glsl from 'babel-plugin-glsl/macro.js';
import useWindowResize from '../../hooks/useWindowResize';

declare global {
    namespace JSX {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        interface IntrinsicElements {// @ts-ignore: Unreachable code error
            outerAtmosphereMaterial: ReactThreeFiber.Object3DNode<typeof OuterAtmosphereMaterial>;
        }
    }
}

const Atmosphere: React.FC<MeshProps>=() => {
    const elementSize=useWindowResize();
    return (
        <mesh position={[0, 0, 0]}>
            <Sphere args={[elementSize.earthSize, 30, 30]} scale={elementSize.scale}>
                <outerAtmosphereMaterial />
            </Sphere>
        </mesh>
    );
};

const OuterAtmosphereMaterial: typeof THREE.ShaderMaterial=shaderMaterial(
    {blending: THREE.AdditiveBlending, side: THREE.BackSide},
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
);

extend({OuterAtmosphereMaterial});

export default Atmosphere;