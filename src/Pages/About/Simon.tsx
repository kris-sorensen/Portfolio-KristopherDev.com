import * as THREE from 'three';
import React, {useEffect, useRef, useState} from 'react';
import {extend, MeshProps} from '@react-three/fiber';
import {Plane} from '@react-three/drei';



const Simon=() => {
    const [numOfPlanes, setNumOfPlanes]=useState<number>(9);
    const [rows, setRows]=useState<number>(3);
    const [colors, setColors]=useState<string[]>(['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#00ffff', '#ff00ff', '#ff8000', '#8000ff', '#800000']);
    const sequence=useRef<number[]>([]);
    const [sequenceIndex, setSequenceIndex]=useState<number>(0);

    const group=useRef<THREE.Group&THREE.Mesh>(null!);

    useEffect(() => {
        restart();
    }, []);

    const restart=() => {
        setSequenceIndex(0);
        sequence.current=[];
        setColors(pickColors(colors));
        addSequence();

    };



    const addSequence=() => {
        // todo: setSequenceIsPlaying(true)
        sequence.current.push(Math.floor(Math.random()*9));
        playSequence();
    };

    const playSequence=() => {
        for(let i=0;i<sequence.current.length;i++) {
            // @ts-expect-error instance of wasn't working will need to change
            group.current.children[sequence.current[i]].children[0].material.color.set(colors[sequence.current[i]]);

        }
        // loop sequence.length
        // change color
        // setTimeout
        // change color to grey

        // todo: setSequenceIsPlaying(false)

    };




    const assignColors=(): void => {

        group.current.children.forEach((child, i) => {

            if(child.children[0] instanceof THREE.Mesh) {

                console.log(child.children[0].material.color);
                child.children[0].material.color.set(colors[i]);
            }
        });
    };






    return (
        <>
            <group position={[3, -.6, 0]} ref={group}>
                {
                    new Array(numOfPlanes).fill(0).fill(.6, 3, 6).fill(1.2, 6).map((y, i) => (
                        <mesh key={i} position={[i%rows/1.666, y, 0]}>
                            <Plane args={[.4, .4, 20, 20]}>
                                <meshBasicMaterial />
                            </Plane>
                        </mesh>
                    ))
                }
            </group>
        </>
    );
};

export default Simon;




const pickColors=(colors: string[]): string[] => {
    let currentIndex=colors.length, randomIndex;
    // While there remain elements to shuffle.
    while(currentIndex!=0) {
        // Pick a remaining element.
        randomIndex=Math.floor(Math.random()*currentIndex);
        currentIndex--;
        // And swap it with the current element.
        [colors[currentIndex], colors[randomIndex]]=[
            colors[randomIndex], colors[currentIndex]];
    }
    return colors;
};