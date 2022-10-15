// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore: Unreachable code error
import glsl from 'babel-plugin-glsl/macro.js';
import * as THREE from "three";
import { shaderMaterial } from '@react-three/drei';



const HaloMaterial: typeof THREE.ShaderMaterial =
    shaderMaterial(
        {
            uSpread: 0, uColor: new THREE.Vector3(0., .93, .99)
        },

        // vertex shader
        glsl`
            varying vec2 vuv; 

            void main(){
                vec4 modelPosition = modelMatrix * vec4(position, 1.0);
                    
                //Final
                vec4 viewPosition = viewMatrix * modelPosition;
                vec4 projectedPosition = projectionMatrix * viewPosition;
                gl_Position = projectedPosition;

                // Props
                vuv = uv;
        }`,
        // fragment shader
        glsl`
            varying vec2 vuv; 
            uniform float uSpread;
            uniform vec3 uColor;

            void main(){
                
                float size = .6;
                float circle = length(vuv -.5) *size;
        
                float outerCircle = 1. - smoothstep(.245 - uSpread,.28 - (uSpread * .2), circle);
                float innerCircle = smoothstep(.22 - uSpread,.255 - uSpread, circle);
                
                float col = outerCircle * innerCircle ;

                float opacity = max(0.,col);
                if(opacity > .99) opacity = 1.;
                vec3 color = col * uColor;

                

                //Final
                gl_FragColor = vec4(vec3(color), opacity);
            }`
    );


declare global {
    namespace JSX {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        interface IntrinsicElements {// @ts-ignore: Unreachable code error
            simonGlowMaterial: ReactThreeFiber.Object3DNode<typeof SimonGlowMaterial>;
        }
    }
}

export default HaloMaterial;