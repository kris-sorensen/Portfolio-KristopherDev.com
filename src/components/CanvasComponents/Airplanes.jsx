import React, { useState, useContext, useRef, useEffect, Suspense } from 'react';
import * as THREE from "three";
import { useControls } from 'leva'
import { useLoader, useThree, useFrame } from '@react-three/fiber'
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { useTexture, useGLTF, Plane } from "@react-three/drei";
import { RadiusContext } from '../CanvasContainer'
// import makePlane from './makePlane';

// Todo:
// use Low on detailed on airplanes when loading, drei,
// Draco compress

// TODO
// /*STEPS
//  * Try to just get one plane working first
//  * - use CanvasContainer or make airplane a child of earth
//  * - do a for loop or map to create many planes eventually
//  * - put elements (plane and tail) inside a group
//  *  - Put useFrame and useRef in each airplanes component that gets rendered and have it manipulate each seperately
//  * - can I still lazy load Airplane elements? I think so
//  * - number of planes useControls to CanvasContainer
//  * - Try useLoader and useTexture in CanvasContainer and in airplanes container. Might be able to pass it down might not.
//  * - use UseFrame clock if possible to reset after each loop
//  * - paramaters like yOff can either go into an object and crate on mount or individual useStates or just variables?
//  */

//// lazy load
// move gltf and texture and pass down with props
// useContext for radius
// add random into y Off and check everything else
// add multiple planes

const Airplanes = (props) => {
    // // Airplane Model
    const { nodes, materials } = useGLTF('/models/airplane-transformed.glb')
    // Trail Texture
    const airplaneTrail = useTexture('/planeTrails.png') //todo: try to move this to canvasContainer and pass down

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
        yOff: { value: 9.7, min: -30, max: 30, step: .1 },
    })

    let yOff = (9.5 + .2) + Math.random() * 1.0 //todo: replace 9.5 with a context of earth radius
    let rot = Math.random() * Math.PI * 2.0
    let rad = Math.random() * Math.PI * .45 + .2
    let randomAxis = new THREE.Vector3(random(), random(), random()).normalize()
    let randomAxisRot = Math.random() * Math.PI * 2
    let planeSpeed = .4

    useEffect(() => {
        console.log('trailRef.current.rotateX', trailRef.current.rotateX)
        // console.log('trailRef.current.translateY', trailRef.current.translateY)
        // trailRef.current.rotateX(Math.PI)
        trailRef.current.rotateX(Math.PI)
        trailRef.current.translateY(1, 1)
        trailMesh.current.alphaMap.flipY = false
        // console.log('trailRef.current.translateY', trailRef.current.translateY)
    }, [])

    useFrame((delta) => {
        delta.clock.stop()

        group.current.position.set(0, 0, 0)
        group.current.rotation.set(0, 0, 0)

        rot += delta.clock.elapsedTime * planeSpeed

        group.current.rotateOnAxis(randomAxis, randomAxisRot)
        group.current.rotateOnAxis(randomAxis, randomAxisRot)
        group.current.rotateOnAxis(new THREE.Vector3(0, 1, 0), rot)
        group.current.rotateOnAxis(new THREE.Vector3(0, 0, 1), rad)
        group.current.translateY(moveParams.yOff)
        group.current.rotateOnAxis(new THREE.Vector3(1, 0, 0), Math.PI * .5)

        console.log(trailMesh.current)
        delta.clock.start()
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
                    <Plane args={[1, 2]} />
                    <meshStandardMaterial ref={trailMesh} toneMapped={false} {...trailParams} alphaMap={airplaneTrail} />
                </mesh>
            </group>
        </Suspense>
    )
}


const random = () => {
    return Math.random() * 2 - 1
}

// <mesh castShadow receiveShadow geometry={nodes.Object_2.geometry} material={materials.Material__199} />
//         <mesh castShadow receiveShadow geometry={nodes.Object_3.geometry} material={materials.Material__200} />


// // const AirplaneTrail = () => {

// // }














// const makePlane = (planeMesh, trailTexture, scene, earthRadius) => {

//     const plane = planeMesh.clone() //
//     plane.scale.set(.0015, .0015, .0015)
//     plane.position.set(0, 0, 0)
//     plane.rotation.set(0, 0, 0) // * useRef
//     plane.updateMatrixWorld(); // * delete?

//     plane.traverse((object) => { // Add to all parts of Plane
//         if (object instanceof THREE.Mesh) {
//             object.castShadow = true
//             object.receiveShadow = true
//         }
//     })

//     // Plane Trails
//     // const trail = new THREE.Mesh(
//     //     new THREE.PlaneGeometry(1, 2),
//     //     new THREE.MeshStandardMaterial({
//     //         roughness: 0.4,
//     //         metalness: 0,
//     //         transparent: true,
//     //         opacity: 1,
//     //         alphaMap: trailTexture,
//     //         color: new THREE.Color(1.0, 1.0, 1.0)
//     //     })
//     // )
//     // trail.rotateX(Math.PI)
//     // trail.translateY(1, 1)

//     // const group = new THREE.Group()
//     // group.add(plane)
//     // group.add(trail)

//     // scene.add(group)

//     return {
//         group,
//         rot: Math.random() * Math.PI * 2.0,
//         rad: Math.random() * Math.PI * 0.45 + .2,
//         yOff: (earthRadius + .2) + Math.random() * 1.0,
//         randomAxis: new THREE.Vector3(random(), random(), random()).normalize(),
//         randomAxisRot: Math.random() * Math.PI * 2,
//     }
// }

// const random = () => {
//     return Math.random() * 2 - 1
// }





// const Airplanes = () => {
//     const [earthRadius, setEarthRadius] = useContext(RadiusContext)
//     // Airplane Model
//     const plane = useLoader(GLTFLoader, '/airplane.glb').scene.children[0]
//     // Trail Texture
//     const airplaneTrail = useTexture('/planeTrails.png')
//     // Array of plane data
//     // const [planesData, setPlanesData] = useState([])
//     const planesData = []
//     const { scene } = useThree()

//     const planeParams = useControls({
//         planeSpeed: { value: .4, min: 0, max: 3, step: .01 },
//         numberOfPlanes: { value: 8, min: 0, max: 100, step: 1 },
//     })

//     const meshParams = useControls({
//         roughness: { value: .4, min: 0, max: 1, step: .01 },
//         transparent: true,
//         metalness: { value: 0, min: 0, max: 1, step: 0.01 },
//         opacity: { value: 1, min: 0, max: 1, step: .01 },
//     })

//     // Create X amount of airplanes and add them to scene
//     for (let i = 0; i < planeParams.numberOfPlanes; i++) {
//         const planes = makePlane(plane, airplaneTrail, scene, earthRadius)
//         planesData.push(planes)
//     }


//     return (
//         <mesh>
//             <planeGeometry recieveShadow castShadow>
//                 <meshStandardMaterial {...meshParams} alphaMap={plane} color={[1, 1, 1]} />
//             </planeGeometry>
//         </mesh>
//     );
// }


// // const clock = new THREE.Clock()

// // const tick = () => {
// //     // stats.begin()

// //     const elapsedTime = clock.getElapsedTime()


// //

// //     // Move Planes
// //     if (planesData !== null) {
// //         planesData.forEach((planeData) => {

// //             let plane = planeData.group

// //             plane.position.set(0, 0, 0)
// //             plane.rotation.set(0, 0, 0)
// //             plane.updateMatrixWorld()

// //             planeData.rot += elapsedTime * parameters.planeSpeed

// //             plane.rotateOnAxis(planeData.randomAxis, planeData.randomAxisRot) // Random axis
// //             plane.rotateOnAxis(new Vector3(0, 1, 0), planeData.rot) // Y axis rotation
// //             plane.rotateOnAxis(new Vector3(0, 0, 1), planeData.rad) // Radius
// //             plane.translateY(planeData.yOff)
// //             plane.rotateOnAxis(new Vector3(1, 0, 0), +Math.PI * .5)

// //             clock.start()
// //         })
// //     }

// //     // Update controls
// //     // controls.update()

// //     // Render
// //     renderer.render(scene, camera)

// //     // Call tick again on the next frame
// //     window.requestAnimationFrame(tick)

// //     // stats.end()
// //     // start chrome --args --disable-gpu-vsync --disable-frame-rate-limit
// // }


// // <group ref={group} dispose={null}>
// //     <group scale={.012} position={[0, 0, 0]} rotation={[-angleToRadians(80), -angleToRadians(5), -angleToRadians(80)]}>
// //         {/* <color attach="background" args={["blue"]} /> */}
// //         <mesh castShadow receiveShadow geometry={nodes.Object_2.geometry} material={materials.Material__199} />
// //         <mesh castShadow receiveShadow geometry={nodes.Object_3.geometry} material={materials.Material__200} />

// //     </group>
// // </group>

export default Airplanes