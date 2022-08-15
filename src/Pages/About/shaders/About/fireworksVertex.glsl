uniform float uSize;
uniform float uFriction;
uniform float uGravity;
uniform float uAngleIncrement;
uniform float uTime;
attribute float aVelocities;
attribute float aIndex;
varying float vVelocity;
varying vec2 vUv;

varying vec3 vColor;

void main(){
    /*
    * Position
    */
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
        vVelocity = aVelocities;
        // vVelocity *= (uFriction - (uTime *.01));
        // modelPosition.xyz = modelPosition.xyz * vVelocity;
        modelPosition.x += (cos(uAngleIncrement * aIndex) * .5) * vVelocity;
        modelPosition.y += (sin(uAngleIncrement * aIndex) * .5) * vVelocity;

        modelPosition.xy *= uTime;
        modelPosition.y -= (uGravity * uTime);

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
    vUv = uv;

}