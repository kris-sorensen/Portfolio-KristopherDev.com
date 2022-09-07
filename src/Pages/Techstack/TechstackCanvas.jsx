import React, { Suspense } from 'react';
import * as THREE from 'three';
import { Canvas, extend } from '@react-three/fiber';
import './styles/techstack.css';
import { useControls, Leva } from 'leva';
import Spiral from './Spiral'
import { Circle, Edges, OrbitControls, Cylinder, Html, Plane, Sphere } from '@react-three/drei'
import Loader from '../../utils/loader'

/* TODO:
  * create a new store and place parameters
* add uniforms, shader, and shader properties
* setup points 
* setup attributes
* setup for loop for creating attributes
* setup useFrame

? try less particles but bigger particles
*/

function TechstackCanvas() {

    return (
        <div style={{ height: '100%', width: '100%' }} className="canvas-container">
            <Leva hidden />
            <Canvas gl={{}} shadows camera={{ position: [0, 0, 5] }}>
                <OrbitControls />
                <Suspense fallback={Loader}>
                    {/* <Spiral /> */}
                    <directionalLight castShadow position={[10, 10, 10]} />
                    <Plane args={[20, 10]} >
                        <meshStandardMaterial castShadow recieveShadow color="red" />
                    </Plane>
                    <group rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0.05]}>
                        <PuckReact />
                        <PuckThreejs />
                        <PuckRedux />
                        <PuckJS />
                        <PuckTS />
                    </group>
                </Suspense>
            </Canvas>
        </div>
    );
}



const PuckReact = () => {

    return (
        <mesh position={[0, 0, 1]}>
            <Cylinder args={[.3, .3, .1, 30, 30]}>
                <Html className="puck-content" rotation-x={-Math.PI / 2} position={[0, 0.06, .0]} transform occlude>
                    <div style={{ width: "15px", height: "15px", backgroundColor: '#222', borderRadius: "50%" }} >
                        <img onClick={() => console.log('click top')} style={{ width: '100%', height: '100%' }} src={"react.svg"} alt="Social Links" />


                    </div>
                </Html>
                <Html className="puck-content" rotation-x={Math.PI / 2} position={[0, -0.06, .0]} transform occlude>
                    <div style={{ width: "15px", height: "15px", backgroundColor: '#222', borderRadius: "50%" }} >
                        <img onClick={() => console.log('click bottom')} style={{ width: '100%', height: '100%' }} src="react.svg" alt="Social Links" />
                    </div>
                </Html>
                <meshStandardMaterial castShadow recieveShadow color="#222" />
            </Cylinder>
        </mesh>
    )
}
const PuckThreejs = () => {

    return (
        <mesh position={[1, 0, 2]}>
            <Cylinder args={[.3, .3, .1, 30, 30]}>
                <Html className="puck-content" rotation-x={-Math.PI / 2} position={[0, 0.06, .0]} transform occlude>
                    <div style={{ width: "15px", height: "15px", backgroundColor: '#222', borderRadius: "50%" }} >
                        <img onClick={() => console.log('click top')} style={{ width: '100%', height: '100%' }} src={"threejs.svg"} alt="Social Links" />


                    </div>
                </Html>
                <Html className="puck-content" rotation-x={Math.PI / 2} position={[0, -0.06, .05]} transform occlude>
                    <div style={{ width: "15px", height: "15px", backgroundColor: '#fff', borderRadius: "50%" }} >
                        <img onClick={() => console.log('click bottom')} style={{ width: '100%', height: '100%' }} src="threejs.svg" alt="Social Links" />
                    </div>
                </Html>
                <meshStandardMaterial castShadow recieveShadow />
            </Cylinder>
        </mesh>
    )
}
const PuckRedux = () => {

    return (
        <mesh position={[2, 0, -1]}>
            <Cylinder args={[.3, .3, .1, 30, 30]}>
                <Html className="puck-content" rotation-x={-Math.PI / 2} position={[0, 0.06, .0]} transform occlude>
                    <div style={{ width: "15px", height: "15px", backgroundColor: '#000', borderRadius: "50%" }} >
                        <img onClick={() => console.log('click top')} style={{ width: '100%', height: '100%' }} src={"redux.svg"} alt="Social Links" />


                    </div>
                </Html>
                <Html className="puck-content" rotation-x={Math.PI / 2} position={[0, -0.06, .0]} transform occlude>
                    <div style={{ width: "15px", height: "15px", backgroundColor: '#001', borderRadius: "50%" }} >
                        <img onClick={() => console.log('click bottom')} style={{ width: '100%', height: '100%' }} src="redux.svg" alt="Social Links" />
                    </div>
                </Html>
                <meshStandardMaterial castShadow recieveShadow color="#000" />
            </Cylinder>
        </mesh>
    )
}
const PuckJS = () => {

    return (
        <mesh position={[3, 0, -2]}>
            {/* <Sphere> */}
            <Cylinder args={[.3, .3, .1, 30, 30]}>
                <Html className="puck-content" rotation-x={-Math.PI / 2} position={[.0, 0.06, .0]} transform occlude>
                    <div style={{ width: "15px", height: "15px", backgroundColor: '#f7df1e', borderRadius: "50%" }} >
                        <img onClick={() => console.log('click top')} style={{ width: '100%', height: '100%', borderRadius: '50%' }} src={"js.svg"} alt="Social Links" />


                    </div>
                </Html>
                <Html className="puck-content" rotation-x={Math.PI / 2} position={[0, -0.06, .0]} transform occlude>
                    <div style={{ width: "15px", height: "15px", backgroundColor: '#f7df1e', borderRadius: "50%" }} >
                        <img onClick={() => console.log('click bottom')} style={{ width: '100%', height: '100%', borderRadius: '50%' }} src="js.svg" alt="Social Links" />
                    </div>
                </Html>
                <meshStandardMaterial castShadow recieveShadow color='#f7df1e' />
                {/* </Sphere> */}
            </Cylinder>
        </mesh>
    )
}
const PuckTS = () => {

    return (
        <mesh position={[4, 0, 0]}>
            <Cylinder args={[.3, .2, .1, 30, 30]}>
                <Html className="puck-content" rotation-x={-Math.PI / 2} position={[0, 0.06, .0]} transform occlude>
                    <div style={{ width: "15px", height: "15px", backgroundColor: '#222', borderRadius: "50%" }} >
                        <img onClick={() => console.log('click top')} style={{ width: '100%', height: '100%', borderRadius: '50%' }} src="typescript.svg" alt="Social Links" />


                    </div>
                </Html>
                <Html className="puck-content" rotation-x={Math.PI / 2} position={[0, -0.06, .0]} transform occlude>
                    <div style={{ width: "15px", height: "15px", backgroundColor: '#222', borderRadius: "50%" }} >
                        <img onClick={() => console.log('click bottom')} style={{ width: '100%', height: '100%', borderRadius: '50%', scale: .8 }} src="typescript.svg" alt="Social Links" />
                    </div>
                </Html>
                <meshStandardMaterial castShadow recieveShadow color="#007acc" />
            </Cylinder>
        </mesh>
    )
}

export default TechstackCanvas;