import { shaderMaterial } from '@react-three/drei';
import glsl from 'babel-plugin-glsl/macro.js';

const FireworkMaterial =
    shaderMaterial(
        {
            uSize: 1,
            uTime: .1,
            uAngleIncrement: 1,
            uGravity: 2.0,
            uFriction: 1,
            uOpacity: 1,
            uSpread: .25,
            uFireworkSize: 1,
        },

        // vertex shader
        glsl`
            uniform float uSize;
            uniform float uFriction;
            uniform float uGravity;
            uniform float uAngleIncrement;
            uniform float uTime;
            uniform float uSpread;
            uniform float uFireworkSize;
            
            attribute float aVelocities;
            attribute float aIndex;
            varying float vVelocity;
            varying vec2 vuv;

            varying vec3 vColor;
            varying vec2 vOriginalPosition;
            varying float vThrottle;
            

            void main(){
            /*
            * Position
            */
            vec4 modelPosition = modelMatrix * vec4(position, 1.0);
                vVelocity = aVelocities;

                //save original positions for place correction
                vOriginalPosition = position.xy;

                // Move particles out in a circular motion in random directions 
                modelPosition.x += ((cos(uAngleIncrement * aIndex)  * uSpread) * vVelocity - vOriginalPosition.x);
                modelPosition.y += ((sin(uAngleIncrement * aIndex) * uSpread) * vVelocity - vOriginalPosition.y);


                // Rate of Expansion
                modelPosition.xy *= (uTime * uFireworkSize);
                
                // Adjust positioning from (0,0) to event location
                modelPosition.x += vOriginalPosition.x;
                modelPosition.y += vOriginalPosition.y;

                // add Gravity
                vThrottle = .004;
                modelPosition.y -= pow(uTime, uGravity) * vThrottle;

                //Final
                vec4 viewPosition = viewMatrix * modelPosition;
                vec4 projectedPosition = projectionMatrix * viewPosition;
                gl_Position = projectedPosition;


            /*
            * Size
            */
            gl_PointSize = uSize;

            /*
            * Color
            */
            vColor = color;
            vuv = uv;
        }`,
        // fragment shader
        glsl`
            uniform float uTime;
            uniform float uOpacity;
        
            varying vec3 vColor;
            varying vec2 vuv;
            varying vec3 color;
            varying float vOpacity;


            void main(){

                //Light point pattren (difuse point that fades faster)
                float strength = distance(gl_PointCoord, vec2(.5));
                strength = 1. - strength;
                strength = pow(strength, 2.);
                
                // Inital color flashes white and then goes to color
                float transitionColor = smoothstep(.25, .1, uTime);

                // Color
                vec3 color = vColor;
                if(transitionColor < 0.1){
                    color =  color;
                }else{
                    color =  mix(vec3(transitionColor), vColor, strength);
                }

                // Opacity
                float opacity = smoothstep( 2.6, .8, uTime);
                    
                //Final
                gl_FragColor = vec4(color, opacity);
            }`
    );

export default FireworkMaterial