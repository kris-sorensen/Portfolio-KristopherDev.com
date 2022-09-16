// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore: Unreachable code error
import glsl from 'babel-plugin-glsl/macro.js'; import * as THREE from "three";
import { shaderMaterial } from '@react-three/drei';
import { Object3DNode } from '@react-three/fiber';


const SimonGlowMaterial: typeof THREE.ShaderMaterial = shaderMaterial(
    { blending: THREE.AdditiveBlending, uColor: new THREE.Vector3(1, 0, 0) },
    // vertex shader
    glsl`
    varying vec3 vertexNormal;
    varying vec2 vuv;

    void main(){
        vertexNormal = normal;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); // boiler plate code

        vuv = uv;
    }
  `,
    // fragment shader
    glsl`
    varying vec3 vertexNormal;
    varying vec2 vuv;
    uniform vec3 uColor;

    void main() {
        float d = length(vuv -.5) - 0.01; // signed distance function

        vec3 col = vec3(step(0., -d)); // create white circle with black background

        float glow = 0.01/d; // create glow and diminish it with distance
        glow = clamp(glow, 0., 1.); // remove artifacts
        // col = smoothstep(.5, 1., col);
        col += glow * 1.; // add glow
        col = col * uColor;

        gl_FragColor = vec4(col,1.0); // output color

        // gl_FragColor = vec4(0.3,0.6,1.0,(1. - distance(vuv, vec2(.5))*1.6) ) ;
    }
  `
);


declare global {
    namespace JSX {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        interface IntrinsicElements {// @ts-ignore: Unreachable code error
            simonGlowMaterial: ReactThreeFiber.Object3DNode<typeof SimonGlowMaterial>;
        }
    }
}


export default SimonGlowMaterial;