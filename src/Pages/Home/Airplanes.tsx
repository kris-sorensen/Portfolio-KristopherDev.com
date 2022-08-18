/* eslint-disable @typescript-eslint/ban-ts-comment */
//@ts-nocheck
// todo: delete above code when done typing file
import React, {useState, useRef, useEffect, Suspense} from 'react';
import * as THREE from "three";
import {useFrame} from '@react-three/fiber';
import {useTexture, useGLTF, Plane} from "@react-three/drei";
import useWindowResize from '../../hooks/useWindowResize';
import {Mesh} from 'three';
import useTabActive from '../../hooks/useTabActive';


const Airplanes=() => {
    const [hovered, setHovered]=useState(false);

    const elementSize=useWindowResize();
    // Triggers hook when browser tab is left and returned to
    const needsPageReload=useTabActive();

    // useLayoutEffect((): void => {
    // document.body.style.cursor=hovered? 'pointer':'auto';
    // return () => document.body.style.cursor='auto';
    // }, [hovered]);

    const trailRef=useRef<Mesh>();
    const trailMesh=useRef<Mesh>();
    const group=useRef<Mesh>();

    // Airplane Trail Texture
    const airplaneTrail=useTexture('/planeTrails.png');

    // Airplane Model
    const {nodes, materials}=useGLTF('/models/airplane-transformed.glb');

    let rot: number=Math.random()*Math.PI*2.0;
    const rad: number=Math.random()*Math.PI*.45+.2;
    const randomAxis: THREE.Vector3=new THREE.Vector3(random(), random(), random()).normalize();
    const randomAxisRot: number=Math.random()*Math.PI*2;
    const planeSpeed=useRef(.4);

    useEffect(() => {
        trailRef.current.rotateX(Math.PI);
        trailRef.current.translateY(1, 1);
    }, []);

    const time=new THREE.Clock();
    let deltaTime=0;

    useFrame(() => {
        group.current.position.set(0, 0, 0);
        group.current.rotation.set(0, 0, 0);

        deltaTime=time.getDelta();
        rot+=deltaTime*planeSpeed.current*.75;

        group.current.rotateOnAxis(randomAxis, randomAxisRot);
        group.current.rotateOnAxis(randomAxis, randomAxisRot);
        group.current.rotateOnAxis(new THREE.Vector3(0, 1, 0), rot);
        group.current.rotateOnAxis(new THREE.Vector3(0, 0, 1), rad);
        group.current.translateY(elementSize.yOff);
        group.current.rotateOnAxis(new THREE.Vector3(1, 0, 0), Math.PI*.5);


    });

    // Airplane explode
    // const handleHover=() => {
    // console.log('everyday we hover');
    // setHovered(!hovered);
    // console.log();
    // group.current.visible=!group.current.visible;
    // // $('html,body').css('cursor', 'pointer');
    // };
    const handleClick=() => {
        planeSpeed.current+=.8;
        // group.current.visible=!group.current.visible;
        //todo: destroy object with fire if clicked too many times?

    };

    return (
        <Suspense fallback={null}>

            {/* onPointerOut={handleHover} onPointerOver={handleHover} */}
            <group ref={group} onClick={handleClick} >
                <group scale={.0018} >
                    <mesh geometry={nodes.Cube_2_2_Body_0_1.geometry} material={materials.Body} />
                    <mesh geometry={nodes.Cube_2_2_Body_0_2.geometry} material={materials.material} />
                    <mesh geometry={nodes.Cube_2_2_Body_0_3.geometry} material={materials.Glass} />
                </group>
                <mesh ref={trailRef}   >
                    <Plane args={[1, 2]} >
                        <meshBasicMaterial ref={trailMesh} alphaMap={airplaneTrail} transparent={true} /> {'// todo: change to meshStandardMaterial when do shadows'}
                    </Plane>
                </mesh>
            </group>
        </Suspense>
    );
};

const random=() => {
    return Math.random()*2-1;
};

useGLTF.preload('/models/airplane-transformed.glb');
export default Airplanes;