import { shaderMaterial } from '@react-three/drei';
import glsl from 'babel-plugin-glsl/macro.js';



const SlowRevealMaterial = shaderMaterial(
    { uTime: 0 },// vertex shader
    glsl`
    varying vec2 vUv;

    void main(){
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        vUv = uv;
    }
  `,
    // fragment shader
    glsl`
    varying vec2 vUv;
    uniform float uTime;

    
    vec2 rotate(vec2 uv, float rotation, vec2 mid)
    {
        return vec2(
        cos(rotation) * (uv.x - mid.x) + sin(rotation) * (uv.y - mid.y) + mid.x,
        cos(rotation) * (uv.y - mid.y) - sin(rotation) * (uv.x - mid.x) + mid.y
        );
    }
    void main() {
        vec2 rotateUv = rotate(vUv, 1.0, vec2(0.5));

        // Calculate Transition Line
        float sinTime = (1. + (sin(uTime * .5))) / 2.;
        float fade = sinTime - .1;
        
        float strength = smoothstep( sinTime, fade, vUv.x);
        // float strength1 = 1.0 - step(.5,vUv.y);
        gl_FragColor = vec4(strength, strength, strength, strength);
    }
  `
)


export default SlowRevealMaterial