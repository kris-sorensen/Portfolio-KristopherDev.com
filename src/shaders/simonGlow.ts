// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore: Unreachable code error
import glsl from 'babel-plugin-glsl/macro.js'; import * as THREE from "three";
import { shaderMaterial } from '@react-three/drei';
import { Object3DNode } from '@react-three/fiber';


const SimonGlowMaterial: typeof THREE.ShaderMaterial = shaderMaterial(
    { uColor: new THREE.Vector3(1, 1, 1) },
    // vertex shader
    glsl`
    varying vec2 vuv;

    void main(){
        vec4 modelPosition = modelMatrix * vec4(position, 1.0);

        
        //Final
                vec4 viewPosition = viewMatrix * modelPosition;
                vec4 projectedPosition = projectionMatrix * viewPosition;
                gl_Position = projectedPosition;

        vuv = uv;
    }
  `,
    // fragment shader
    glsl`
    varying vec3 vertexNormal;
    varying vec2 vuv;
    uniform vec3 uColor;

    void main() {
        vec2 xy = mod((vuv),.05);

        float d = length(xy -.025); // signed distance function

        vec3 col = vec3(step(0.2, -d)); // create white circle with black background

        float difuse = 1.2;

        float glow = 0.01/d * difuse; // create glow and diminish it with distance
        glow = clamp(glow, 0., 1.); // remove artifacts
        col = smoothstep(.5, 1., col);
        col += glow * 1.; // add glow
        col = col * uColor; // add color

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