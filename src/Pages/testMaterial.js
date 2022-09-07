import { shaderMaterial } from '@react-three/drei';
import glsl from 'babel-plugin-glsl/macro.js';

const TestMaterial =
    shaderMaterial(
        {
            uTime: 0
        },

        // vertex shader
        glsl`
            varying vec2 vuv; 
            uniform float uTime;

            void main(){
                vec4 modelPosition = modelMatrix * vec4(position, 1.0);
                
                modelPosition.x = (1. + sin(modelPosition.x * uTime * .1)) * .5;
                // modelPosition.y = (1. + cos(modelPosition.y * uTime )) * .5;
                modelPosition.z = (1. + cos(modelPosition.z * uTime * .1)) * .5;
                

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
            uniform float uTime;
            #define PI 3.14159265359

            void main(){
                // //Light point pattren (difuse point that fades faster)
                // float strength = distance(gl_PointCoord, vec2(.5));
                // strength = 1. - strength;
                // strength = pow(strength, 10.);
                // // strength = 1.;
                
                // //Final
                // gl_FragColor = vec4(vec3(1.), strength);

                // intesity of atmospheric effect
                float intensity = pow(distance(vuv,vec2(0.5)) ,2.0);
                // atmospheric glow
                vec3 atmosphere = vec3(0.3,0.6,1.0)* pow(intensity, 1.0);

                gl_FragColor = vec4(0.3,0.6,1.0,1.0) * intensity;
            }`
    );

export default TestMaterial