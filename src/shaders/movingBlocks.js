import * as three from 'three';
import { shaderMaterial } from '@react-three/drei';
import glsl from 'babel-plugin-glsl/macro.js';


const MovingBlocksMaterial = shaderMaterial(

    { uPosition: 0, uColor: new three.Vector3(0.247, 0.318, 0.71), uTime: 0 },

    // Vertex Shader
    glsl`
        varying vec2 vuv;
        uniform float uPosition;
        uniform float uTime;

        void main(){
            vec4 modelPosition = modelMatrix * vec4(position, 1.0);
            
            modelPosition.x = modelPosition.x + uTime;

            //Final
            vec4 viewPosition = viewMatrix * modelPosition;
            vec4 projectedPosition = projectionMatrix * viewPosition;
            gl_Position = projectedPosition;

        // Props
        vuv = uv;
    }`,

    // Fragment Shader
    glsl`
        varying vec2 vuv;
        uniform vec3 uColor;

        void main(){
        vec2 xy = vuv -.5;

        vec3 col = uColor;

        // Final
        gl_FragColor = vec4(col, 1.);
    }`

);


export default MovingBlocksMaterial;