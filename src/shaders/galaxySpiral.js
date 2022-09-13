import { shaderMaterial } from '@react-three/drei';
import glsl from 'babel-plugin-glsl/macro.js';
import * as THREE from "three";


const ParticleMaterial = shaderMaterial(
    { uSize: 1, uStrength: 1.7, uTime: 0, uFadeStart: 0, uFadeEnd: 0, uResetPoint: 0 },
    // vertex shader
    glsl`
    uniform float uSize;
uniform float uTime;
uniform float uSpeed;

attribute float aScale;
attribute vec3 aRandomness;

varying vec3 vColor;

void main(){
    /*
     * Position
    */
    vec4 modelPosition = modelMatrix * vec4(position, 1.0); 
    // spin
    float angle = atan(modelPosition.x, modelPosition.z); // if not at middle of screen you will have to do offset calculation

    // randomness
    modelPosition.xyz += aRandomness;
    // modelPosition.x += aRandomness.x;
    // modelPosition.y += aRandomness.y;
    // modelPosition.z += aRandomness.z;

    float distanceToCenter =  length(modelPosition.xz);
    float angleOffset = (1. / distanceToCenter) * uTime * uSpeed; // 1. / makes inside rotate slower than outside. WO it will do opposite
    angle += angleOffset;
    modelPosition.x = cos(angle) * distanceToCenter;
    modelPosition.z = sin(angle) * distanceToCenter;


    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;


    gl_Position = projectedPosition;


    /*
    * Size
    */
    //aScale gives a random assortment of size particles. Being passed down with an attribute of random values from 0-1
    gl_PointSize = uSize * aScale * 2.;
    // size attenuation adjustment formula
    gl_PointSize *= (1. / -viewPosition.z);

    /*
    * Color
    */
    vColor = color;


}
  `,
    // fragment shader
    glsl`
    uniform float uTime;
    uniform float uResetPoint;
    uniform float uStrength;
    uniform float uFadeEnd;
    uniform float uFadeStart;

    varying vec2 vuv; 
    
    void main() {
      //Light point pattren (difuse point that fades faster)
      float strength = distance(gl_PointCoord, vec2(.5));
      strength = 1. - strength;
      strength = pow(strength, 8.);


      gl_FragColor = vec4(1.,.1, 1., strength);
    }
  `
);

export default ParticleMaterial