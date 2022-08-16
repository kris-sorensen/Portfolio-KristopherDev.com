import { shaderMaterial } from '@react-three/drei';
import glsl from 'babel-plugin-glsl/macro.js';
import * as THREE from "three";
import { Texture } from "three";


const AtmosphereMaterial = shaderMaterial(
    { map: new Texture(), color: new THREE.Color(0.2, 0.0, 0.1) },
    // vertex shader
    glsl`
    varying vec2 vertexUV;
    varying vec3 vertexNormal;

    void main(){
        vertexUV = uv;
        vertexNormal = normalize(normalMatrix * normal);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); // boiler plate code
    }
  `,
    // fragment shader
    glsl`
    uniform sampler2D map;
    varying vec2 vertexUV;
    varying vec3 vertexNormal;

    void main() {
        // intesity of atmospheric effect
        float intensity = 1.25 - dot(vertexNormal, vec3(0.3, 0.6, 1.0));
        // atmospheric glow
        vec3 atmosphere = vec3(0.3,0.6,1.0)* pow(intensity, 1.5);

        gl_FragColor = vec4(atmosphere + texture2D(map, vertexUV).xyz, 1.0);
    }
  `
);

export default AtmosphereMaterial