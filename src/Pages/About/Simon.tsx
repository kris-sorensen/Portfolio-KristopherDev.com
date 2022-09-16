import * as THREE from 'three';
import React, { useEffect, useRef, useState } from 'react';
import { extend, MeshProps, useFrame } from '@react-three/fiber';
import { Circle, Plane, Sphere } from '@react-three/drei';
// * utility functions
import { sleep } from '../../utils/sleep';
import { pickColors } from './util/pickColors';
import SimonGlowMaterial from '../../shaders/simonGlow';


extend({ SimonGlowMaterial });



// todo: extend shader material


const Simon = () => {
    // * setup state
    const [numOfBlocks, setNumOfBlocks] = useState<number>(9);
    const [rows, setRows] = useState<number>(3);
    // * color state
    const [colors, setColors] = useState<string[]>(['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#00ffff', '#ff00ff', '#ff8000', '#8000ff', '#800000']);
    // * sequence state
    const [sequenceIsPlaying, setSequenceIsPlaying] = useState(true);
    const sequence = useRef<number[]>([]);
    const [sequenceIndex, setSequenceIndex] = useState<number>(0);
    // * Refs
    const group = useRef<THREE.Group>(null!);

    // * setup
    useEffect(() => {
        restart();
    }, []);

    const restart = () => {
        setSequenceIndex(0);
        sequence.current = [];
        setColors(pickColors(colors));
        giveBlocksIndex();
        addOneToSequence();
    };

    const giveBlocksIndex = () => {
        // use index to access color. add to each block
        for(let i = 0;i < group.current.children.length;i++) {
            const el = group.current.children;
            // @ts-expect-error instance of wasn't working will need to change
            el[i].uColorIndex = i;
        }
    };
    // * sequence
    const addOneToSequence = () => {
        // reset sequence index
        setSequenceIndex(0);
        // choose random block
        sequence.current.push(Math.floor(Math.random() * 9));
        playSequence();
    };

    const playSequence = async () => {
        // loop throught sequence array and animate each block in sequence
        for(let i = 0;i < sequence.current.length;i++) {
            // @ts-expect-error instance of wasn't working will need to change
            const color = group.current.children[sequence.current[i]].children[0].children[0].material.color;
            // change color of glow
            // //@ts-expect-error instance of wasn't working will need to change
            // group.current.children[sequence.current[i]].children[1].children[0].material.uniforms.uColor.value = new THREE.Vector3(1, 0, 1);
            // set block color
            color.set(colors[sequence.current[i]]);

            await sleep(1000);
            color.set('#ffffff');
            // change color of glow
            //// @ts-expect-error instance of wasn't working will need to change
            // group.current.children[sequence.current[i]].children[1].children[0].material.uniforms.uColor.value = new THREE.Vector3(0, 0, 0);
            // * add Time as white incase a sequence of duplicate colors 
            await sleep(300);
        }
        setSequenceIsPlaying(false);
        // todo: timer start
    };

    // * animate successfully completing sequence and failing sequence
    const flashAllSquares2x = async (color: string) => {

        let count = 1;

        await sleep(200);
        while(count <= 2) {
            // turn color
            for(let i = 0;i < numOfBlocks;i++) {
                // @ts-expect-error instance of wasn't working will need to change
                const material = group.current.children[i].children[0].children[0].material.color;
                material.set(color);
            }
            await sleep(500);
            //turn white
            for(let i = 0;i < numOfBlocks;i++) {
                // @ts-expect-error instance of wasn't working will need to change
                const color = group.current.children[i].children[0].children[0].material.color;
                color.set('#ffffff');
            }
            await sleep(250);
            count += 1;
        }

        await sleep(500);
    };


    // todo: fix any type
    // * handle events
    const handleBoardClick = async (e: any) => {
        console.log(group.current);
        // clicks allowed check (disabled for sequence)
        if(sequenceIsPlaying) return;
        // correct square was clicked check
        console.log(e.object.parent.uColorIndex);
        if(e.object.parent.parent.uColorIndex !=
            sequence.current[sequenceIndex]) {
            setSequenceIsPlaying(true);
            await flashAllSquares2x('#ff0000');
            restart();
            return;
        }
        // flash color
        setSequenceIsPlaying(true);
        const color = e.object.material.color;
        color.set(colors[e.object.parent.parent.uColorIndex]);
        await sleep(350);
        color.set('#ffffff');

        // end of sequence check
        if(sequence.current[sequenceIndex + 1] === undefined) {
            setSequenceIsPlaying(true);
            await flashAllSquares2x('#00ff00');
            addOneToSequence();
            return;
        }
        // todo: reset timer
        setSequenceIndex(sequenceIndex + 1);
        setSequenceIsPlaying(false);
    };


    return (
        <>

            <group position={ [3, -1, 0] } ref={ group }>
                {
                    new Array(numOfBlocks).fill(0).fill(.6, 3, 6).fill(1.2, 6).map((y, i) => (
                        <group key={ i }>
                            <mesh onClick={ handleBoardClick } position={ [i % rows * .8, y * 1.4, 0] }>
                                <Plane args={ [.55, .55, 20, 20] }>
                                    <meshBasicMaterial transparent opacity={ 1 } />
                                </Plane>

                            </mesh>
                            {/* <mesh position={ [i % rows / 1.666, y, -.001] }>
                                <Circle scale={ 1.4 } args={ [.35, 20, 20] }>
                                    <simonGlowMaterial transparent uColor={ new THREE.Vector3(0, 0, 0) } />

                                </Circle>

                            </mesh> */}

                        </group>
                    ))
                }
            </group>



        </>
    );
};


export default Simon;



