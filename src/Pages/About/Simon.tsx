import * as THREE from 'three';
import React, {SyntheticEvent, useEffect, useRef, useState} from 'react';
import {extend, MeshProps} from '@react-three/fiber';
import {Plane} from '@react-three/drei';

// import useTimeout from '../../hooks/useTimeout';



const Simon=() => {
    const [numOfPlanes, setNumOfPlanes]=useState<number>(9);
    const [rows, setRows]=useState<number>(3);
    const [colors, setColors]=useState<string[]>(['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#00ffff', '#ff00ff', '#ff8000', '#8000ff', '#800000']);
    const [sequenceIsPlaying, setSequenceIsPlaying]=useState(false);
    const sequence=useRef<number[]>([]);
    const [sequenceIndex, setSequenceIndex]=useState<number>(0);

    const group=useRef<THREE.Group>(null!);

    useEffect(() => {
        restart();
    }, []);

    const restart=() => {
        setSequenceIndex(0);
        sequence.current=[];
        setColors(pickColors(colors));
        addSequence();
        addSequence();
        addSequence();
        addSequence();
        addSequence();
        addSequence();

    };

    const addSequence=() => {
        setSequenceIsPlaying(true);
        setSequenceIndex(0);
        sequence.current.push(Math.floor(Math.random()*9));
        playSequence();
    };

    const playSequence=async () => {
        for(let i=0;i<sequence.current.length;i++) {
            // @ts-expect-error instance of wasn't working will need to change
            const color=group.current.children[sequence.current[i]].children[0].material.color;

            color.set(colors[sequence.current[i]]);
            await pause(1000);
            color.set('#ffffff');

        }
        setSequenceIsPlaying(false);
    };


    const handleBoardClick=(e: any) => {
        e.preventDefault();
        console.log(e);

        if(sequenceIsPlaying) return;
        // check to see if correct piece was hit
        // if not do red flashes which will trigger restart

        // flash piece if correct

        // check to see if that was the last sequence. if so trigger 2x flashing green wich will trigger addSequence
        setSequenceIndex(sequenceIndex+1);
    };



    return (
        <>
            <group position={[3, -.6, 0]} ref={group}>
                {
                    new Array(numOfPlanes).fill(0).fill(.6, 3, 6).fill(1.2, 6).map((y, i) => (
                        <mesh onClick={handleBoardClick} key={i} position={[i%rows/1.666, y, 0]}>
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

const pause=(delay: number) => {
    return new Promise(resolve => setTimeout(resolve, delay));
};


// const assignColors=(): void => {

//     group.current.children.forEach((child, i) => {

//         if(child.children[0] instanceof THREE.Mesh) {

//             // console.log(child.children[0].material.color);
//             child.children[0].material.color.set(colors[i]);
//         }
//     });
// };
