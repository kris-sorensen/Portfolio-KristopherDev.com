import React, { useContext, useRef, useEffect, Suspense } from 'react';
import * as THREE from "three";
import { useControls } from 'leva'
import { useFrame } from '@react-three/fiber'
import { useTexture, useGLTF, Plane } from "@react-three/drei";
import { RadiusContext } from '../CanvasContainer'



const Airplanes = () => {
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

    let rot = Math.random() * Math.PI * 2.0
    let rad = Math.random() * Math.PI * .45 + .2
    let randomAxis = new THREE.Vector3(random(), random(), random()).normalize()
    let randomAxisRot = Math.random() * Math.PI * 2
    let planeSpeed = .4

    useEffect(() => {
        trailRef.current.rotateX(Math.PI)
        trailRef.current.translateY(1, 1)
    }, [])

    let time = new THREE.Clock();
    let deltaTime = 0

    useFrame(() => {
        group.current.position.set(0, 0, 0)
        group.current.rotation.set(0, 0, 0)

        deltaTime = time.getDelta();
        rot += deltaTime * planeSpeed * .75

        group.current.rotateOnAxis(randomAxis, randomAxisRot)
        group.current.rotateOnAxis(randomAxis, randomAxisRot)
        group.current.rotateOnAxis(new THREE.Vector3(0, 1, 0), rot)
        group.current.rotateOnAxis(new THREE.Vector3(0, 0, 1), rad)
        group.current.translateY(moveParams.yOff)
        group.current.rotateOnAxis(new THREE.Vector3(1, 0, 0), Math.PI * .5)
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

const random = () => {
    return Math.random() * 2 - 1
}

useGLTF.preload('/models/airplane-transformed.glb')
export default Airplanes