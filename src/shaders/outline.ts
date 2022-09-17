// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore: Unreachable code error
import glsl from 'babel-plugin-glsl/macro.js';
import { shaderMaterial } from '@react-three/drei';
import * as THREE from "three";


const OutlineMaterial: typeof THREE.ShaderMaterial = shaderMaterial(
  {},// vertex shader
  glsl`
    varying vec2 vuv;

    void main(){
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        vuv = uv;
    }
  `,
  // fragment shader
  glsl`
  
    varying vec2 vuv;
    
    void main() {
        
        float xL = step(.005, vuv.x );
        float yB = step(.01, vuv.y );
        float xR = 1. - step(.995, vuv.x );
        float yT = 1. - step(.99, vuv.y );
        float strength = xL * yB * yT * xR;
        // float strength = x;
        vec3 col = vec3( strength) * vec3(1.0,1., 1.);
        
        gl_FragColor = vec4(col, 1.);
    }
  `
);


export default OutlineMaterial;