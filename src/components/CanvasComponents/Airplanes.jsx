import React, { useState, useContext, useRef, useEffect, Suspense } from 'react';
import * as THREE from "three";
import { useControls } from 'leva'
import { useLoader, useThree, useFrame } from '@react-three/fiber'
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { useTexture, useGLTF, Plane } from "@react-three/drei";
import { RadiusContext } from '../CanvasContainer'
import Airplane from './models/Airplane'
// import makePlane from './makePlane';

// Todo:
// use Low on detailed on airplanes when loading, drei,
// Draco compress

// TODO
// /*STEPS
//  * Try to just get one plane working first
// // * - use CanvasContainer or make airplane a child of earth
// // * - do a for loop or map to create many planes eventually
// // * - put elements (plane and tail) inside a group
// // *  - Put useFrame and useRef in each airplanes component that gets rendered and have it manipulate each seperately
// // * - can I still lazy load Airplane elements? I think so
// // * - number of planes useControls to CanvasContainer
// // * - Try useLoader and useTexture in CanvasContainer and in airplanes container. Might be able to pass it down might not.
// // * - use UseFrame clock if possible to reset after each loop
// // * - paramaters like yOff can either go into an object and crate on mount or individual useStates or just variables?
//  */


// add multiple planes (needs to be done in this component. Might need to clone model which each addition. might need a group of variables so that the planes end up in different locations and forEach for all in master group)

const Airplanes = () => { // airplane model is passed down with props

    // Airplane Trail Texture
    const airplaneTrail = useTexture('/planeTrails.png')

    // Airplane Model
    const { nodes, materials } = useGLTF('/models/airplane-transformed.glb')

    const [earthRadius, setEarthRadius] = useContext(RadiusContext)

    const trailRef = useRef()
    const trailMesh = useRef()
    const group = useRef()

    const trailParams = useControls({
        roughness: { value: .4, min: 0, max: 1, step: .01 },
        transparent: true,
        metalness: { value: 0, min: 0, max: 1, step: 0.01 },
        opacity: { value: 1, min: 0, max: 1, step: .01 },
        color: new THREE.Color(1.0, 1.0, 1.0)
    })

    const moveParams = useControls({
        yOff: { value: (earthRadius + .2) + Math.random() * 1.0, min: -30, max: 30, step: .1 },
    })

    // let yOff = (earthRadius + .2) + Math.random() * 1.0 //todo: replace 9.5 with a context of earth radius
    let rot = Math.random() * Math.PI * 2.0
    let rad = Math.random() * Math.PI * .45 + .2
    let randomAxis = new THREE.Vector3(random(), random(), random()).normalize()
    let randomAxisRot = Math.random() * Math.PI * 2
    let planeSpeed = .4

    useEffect(() => {
        trailRef.current.rotateX(Math.PI)
        trailRef.current.translateY(1, 1)
        // moveParams.yOff = (earthRadius + .2) + Math.random() * 1.0
    }, [])
    useFrame((delta) => {
        // delta.clock.stop()
        console.log('hit2')
        group.current.position.set(0, 0, 0)
        group.current.rotation.set(0, 0, 0)

        // rot += delta.clock.elapsedTime * planeSpeed
        rot += 10 % delta.clock.elapsedTime * planeSpeed * .001
        console.log('rot', rot)

        group.current.rotateOnAxis(randomAxis, randomAxisRot)
        group.current.rotateOnAxis(randomAxis, randomAxisRot)
        group.current.rotateOnAxis(new THREE.Vector3(0, 1, 0), rot)
        group.current.rotateOnAxis(new THREE.Vector3(0, 0, 1), rad)
        group.current.translateY(moveParams.yOff)
        group.current.rotateOnAxis(new THREE.Vector3(1, 0, 0), Math.PI * .5)

        // delta.clock.start()
    })
    return (
        <Suspense fallback={null}>
            <group ref={group} dispose={null}>
                <group scale={.0015} >
                    <mesh geometry={nodes.Cube_2_2_Body_0_1.geometry} material={materials.Body} />
                    <mesh geometry={nodes.Cube_2_2_Body_0_2.geometry} material={materials.material} />
                    <mesh geometry={nodes.Cube_2_2_Body_0_3.geometry} material={materials.Glass} />
                </group>
                <mesh ref={trailRef}   >
                    <Plane args={[1, 2]} >
                        <meshBasicMaterial ref={trailMesh} alphaMap={airplaneTrail} {...trailParams} />
                    </Plane>
                </mesh>
            </group>
        </Suspense>
    );
}


// const Airplane1 = () => {
//     // Airplane Trail Texture
//     const airplaneTrail = useTexture('/planeTrails.png')

//     // Airplane Model
//     const { nodes, materials } = useGLTF('/models/airplane-transformed.glb')

//     const [earthRadius, setEarthRadius] = useContext(RadiusContext)

//     const trailRef = useRef()
//     const trailMesh = useRef()
//     const group = useRef()

//     const trailParams = useControls({
//         roughness: { value: .4, min: 0, max: 1, step: .01 },
//         transparent: true,
//         metalness: { value: 0, min: 0, max: 1, step: 0.01 },
//         opacity: { value: 1, min: 0, max: 1, step: .01 },
//         color: new THREE.Color(1.0, 1.0, 1.0)
//     })

//     const moveParams = useControls({
//         yOff: { value: (earthRadius + .2) + Math.random() * 1.0, min: -30, max: 30, step: .1 },
//     })

//     // let yOff = (earthRadius + .2) + Math.random() * 1.0 //todo: replace 9.5 with a context of earth radius
//     let rot = Math.random() * Math.PI * 2.0
//     let rad = Math.random() * Math.PI * .45 + .2
//     let randomAxis = new THREE.Vector3(random(), random(), random()).normalize()
//     let randomAxisRot = Math.random() * Math.PI * 2
//     let planeSpeed = .4

//     useEffect(() => {
//         trailRef.current.rotateX(Math.PI)
//         trailRef.current.translateY(1, 1)
//         // moveParams.yOff = (earthRadius + .2) + Math.random() * 1.0
//     }, [])
//     useFrame((delta) => {
//         // delta.clock.stop()
//         console.log('hit2')
//         group.current.position.set(0, 0, 0)
//         group.current.rotation.set(0, 0, 0)

//         // rot += delta.clock.elapsedTime * planeSpeed
//         rot += Math.sin(delta.clock.elapsedTime * planeSpeed)

//         group.current.rotateOnAxis(randomAxis, randomAxisRot)
//         group.current.rotateOnAxis(randomAxis, randomAxisRot)
//         group.current.rotateOnAxis(new THREE.Vector3(0, 1, 0), rot)
//         group.current.rotateOnAxis(new THREE.Vector3(0, 0, 1), rad)
//         group.current.translateY(moveParams.yOff)
//         group.current.rotateOnAxis(new THREE.Vector3(1, 0, 0), Math.PI * .5)

//         // delta.clock.start()
//     })
//     return (
//         <Suspense fallback={null}>
//             <group ref={group} dispose={null}>
//                 <group scale={.0015} >
//                     <mesh geometry={nodes.Cube_2_2_Body_0_1.geometry} material={materials.Body} />
//                     <mesh geometry={nodes.Cube_2_2_Body_0_2.geometry} material={materials.material} />
//                     <mesh geometry={nodes.Cube_2_2_Body_0_3.geometry} material={materials.Glass} />
//                 </group>
//                 <mesh ref={trailRef}   >
//                     <Plane args={[1, 2]} >
//                         <meshBasicMaterial ref={trailMesh} alphaMap={airplaneTrail} {...trailParams} />
//                     </Plane>
//                 </mesh>
//             </group>
//         </Suspense>
//     );
// }

// const Airplane2 = () => {
//     // Airplane Trail Texture
//     const airplaneTrail = useTexture('/planeTrails.png')

//     // Airplane Model
//     const { nodes, materials } = useGLTF('/models/airplane-transformed.glb')

//     const [earthRadius, setEarthRadius] = useContext(RadiusContext)

//     const trailRef = useRef()
//     const trailMesh = useRef()
//     const group2 = useRef()

//     const trailParams = useControls({
//         roughness: { value: .4, min: 0, max: 1, step: .01 },
//         transparent: true,
//         metalness: { value: 0, min: 0, max: 1, step: 0.01 },
//         opacity: { value: 1, min: 0, max: 1, step: .01 },
//         color: new THREE.Color(1.0, 1.0, 1.0)
//     })

//     const moveParams = useControls({
//         yOff: { value: (earthRadius + .2) + Math.random() * 1.0, min: -30, max: 30, step: .1 },
//     })

//     // let yOff = (earthRadius + .2) + Math.random() * 1.0 //todo: replace 9.5 with a context of earth radius
//     let rot = Math.random() * Math.PI * 2.0
//     let rad = Math.random() * Math.PI * .45 + .2
//     let randomAxis = new THREE.Vector3(random(), random(), random()).normalize()
//     let randomAxisRot = Math.random() * Math.PI * 2
//     let planeSpeed = .4

//     useEffect(() => {
//         trailRef.current.rotateX(Math.PI)
//         trailRef.current.translateY(1, 1)
//         // moveParams.yOff = (earthRadius + .2) + Math.random() * 1.0
//     }, [])
//     useFrame((delta) => {
//         // delta.clock.stop()
//         console.log('hit2')
//         group2.current.position.set(0, 0, 0)
//         group2.current.rotation.set(0, 0, 0)

//         rot += Math.sin(delta.clock.elapsedTime * planeSpeed)

//         group2.current.rotateOnAxis(randomAxis, randomAxisRot)
//         group2.current.rotateOnAxis(randomAxis, randomAxisRot)
//         group2.current.rotateOnAxis(new THREE.Vector3(0, 1, 0), rot)
//         group2.current.rotateOnAxis(new THREE.Vector3(0, 0, 1), rad)
//         group2.current.translateY(moveParams.yOff)
//         group2.current.rotateOnAxis(new THREE.Vector3(1, 0, 0), Math.PI * .5)

//         // delta.clock.start()
//     })
//     return (
//         <Suspense fallback={null}>
//             <group ref={group2} dispose={null}>
//                 <group scale={.0015} >
//                     <mesh geometry={nodes.Cube_2_2_Body_0_1.geometry} material={materials.Body} />
//                     <mesh geometry={nodes.Cube_2_2_Body_0_2.geometry} material={materials.material} />
//                     <mesh geometry={nodes.Cube_2_2_Body_0_3.geometry} material={materials.Glass} />
//                 </group>
//                 <mesh ref={trailRef}   >
//                     <Plane args={[1, 2]} >
//                         <meshBasicMaterial ref={trailMesh} alphaMap={airplaneTrail} {...trailParams} />
//                     </Plane>
//                 </mesh>
//             </group>
//         </Suspense>
//     );
// }












const random = () => {
    return Math.random() * 2 - 1
}






export default Airplanes