 varying vec3 vColor;
varying vec2 vUv;
uniform float uOpacity;
uniform float uTime;



void main(){
    // //Light point pattren (difuse point that fades faster)
    float strength = distance(gl_PointCoord, vec2(.5));
    strength = 1. - strength;
    strength = pow(strength, 20.);
    // add if statement that turns it from white to color 
    // if(uTime < .6 ){
    
    // }
    //Final
    //Blue
    vec3 color = mix(vec3(0., 0., 1.), vColor, strength);
    //Red
    // vec3 color = mix(vec3(1., 0., 0.), vColor, strength);
    //Purple
    // vec3 color = mix(vec3(1., 0., 1.), vColor, strength);

    // gl_FragColor= vec4(color, 1.);
    gl_FragColor= vec4(color, uOpacity);
    // gl_FragColor= vec4(vec3(1.,0.,0.),vec3(0.,0.,1) uOpacity);
    // gl_FragColor = vec4(vUv, 1.0, uOpacity);
}