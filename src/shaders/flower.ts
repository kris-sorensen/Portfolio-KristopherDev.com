// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore: Unreachable code error
import glsl from 'babel-plugin-glsl/macro.js';
import * as THREE from "three";
import { shaderMaterial } from '@react-three/drei';
import { Object3DNode } from '@react-three/fiber';


const OuterAtmosphereMaterial: typeof THREE.ShaderMaterial = shaderMaterial(
    {},
    // vertex shader
    glsl`
    
    varying vec2 vuv; 
    
    void main(){
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); // boiler plate code

        vuv = uv;
    }
  `,
    // fragment shader
    glsl`

    varying vec2 vuv; 
    #define PI 3.1415926538

    float toPolar(vec2 vuv){
        float distance = length(vuv)*2.;
        float angle = atan((vuv.y)*2., (vuv.x)* 2.);
        return angle / 2.*PI, distance;
    }

    void main() {
        vec2 xy = vuv - .5;
        xy *= 2.;
        float len = length(xy);
        float angle = atan(xy.y,xy.x);

        float col =  1.2 * sin(angle * 10.) ;

        float color = 1. - smoothstep(col,col +.05, angle);

        gl_FragColor = vec4(vec3(color),1.);
    }
  `
);


declare global {
    namespace JSX {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        interface IntrinsicElements {// @ts-ignore: Unreachable code error
            outerAtmosphereMaterial: ReactThreeFiber.Object3DNode<typeof OuterAtmosphereMaterial>;
        }
    }
}


export default OuterAtmosphereMaterial;