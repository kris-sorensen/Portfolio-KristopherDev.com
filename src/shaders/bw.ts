// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore: Unreachable code error
import glsl from 'babel-plugin-glsl/macro.js';
import { shaderMaterial } from '@react-three/drei';
import * as THREE from "three";


const BwMaterial: typeof THREE.ShaderMaterial = shaderMaterial(
  { blending: THREE.NoBlending, uGradientDirection: true },// vertex shader
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
    uniform bool uGradientDirection;
    
    void main() {

        float strength = step(.5, vuv.x );
        if(uGradientDirection){
          strength = 1. - strength;
        };
        
        gl_FragColor = vec4(vec3(strength), 1.0);
    }
  `
);


export default BwMaterial;