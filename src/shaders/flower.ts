// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore: Unreachable code error
import glsl from 'babel-plugin-glsl/macro.js';
import * as THREE from "three";
import { shaderMaterial } from '@react-three/drei';
import { Object3DNode } from '@react-three/fiber';


const OuterAtmosphereMaterial: typeof THREE.ShaderMaterial = shaderMaterial(
    { uTime: 0, transparent: true },
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
    uniform float uTime;

   

    void main() {
        //setup uv
        vec2 xy = vuv - .5;
        xy *= 2.;

        //length
        float len = length(xy);
        
        // angle
        float angle = atan(xy.y, xy.x) + PI * (PI * 2.) ;


    	float val = len + sin(angle * (mod(uTime /1000., 10.) +30.) + uTime) * .05 * sin((uTime * .5) * 2.);
        
        // adjust size with time
        float size = .58 + .12 * sin(uTime);

    	float lenVal = smoothstep(size, size + .1, val) * smoothstep(size + .06, size + .05, val);
        
        lenVal *= smoothstep(0., .6, len);

        float lerpVal = ((sin(uTime) + 1.) / 4.);
    	
        //color
        vec3 col = mix(vec3(1., 0., 0.), vec3(1., 0., 0.), lerpVal) ;
        float a = max(.0, lenVal);

        //alpha
        a *= 100.;
        a = clamp(a,0.,1.);
        
        //final
        gl_FragColor = vec4(col, a) ;
       
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