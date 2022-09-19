import * as THREE from 'three';
import React, { useEffect, useRef, useState } from 'react';
import { extend } from '@react-three/fiber';
import { Plane, Text } from '@react-three/drei';
import { Select } from '@react-three/postprocessing';

// * Components
import Rules from './Rules';

// * utility functions
import { sleep } from '../../utils/sleep';
import { pickColors } from './util/pickColors';
import SimonGlowMaterial from '../../shaders/simonGlow';

//* types
import { ColorType } from './types/types';
import useWindowSize from '../../hooks/useWindowSize';



extend({ SimonGlowMaterial });



// todo: extend shader material


const Simon = () => {
    const { width, height } = useWindowSize();
    // * setup state
    const [numOfBlocks, setNumOfBlocks] = useState<number>(7);
    const [rows, setRows] = useState<number>(3);
    const [xPositions, setXPositions] = useState<number[]>(
        [0, .7, 1.4, 2.1,
            1.4, 2.1,
            1.4
        ]
    );
    const [yPositions, setYPositions] = useState<number[]>(
        [0, 0, 0, 0,
            .7, .7,
            -.7
        ]
    );
    // * color state
    const [colorsArr, setColorsArr] = useState<ColorType[]>([
        { r: 0, b: 1, g: .95 }, // aqua
        { r: 1, g: 0, b: .26 }, // light blue
        { r: 0, g: .38, b: .95 }, // blue
        { r: .62, g: .46, b: .96 }, // Lavender
        { r: .98, g: .32, b: .71 }, // pink
        { r: 1, g: 0, b: .27 }, // fushia
        { r: .98, g: .47, b: .24 } // orange
    ]);

    // * sequence state
    const [sequenceIsPlaying, setSequenceIsPlaying] = useState(true);
    const sequence = useRef<number[]>([]);
    const [sequenceIndex, setSequenceIndex] = useState<number>(0);
    // * level state
    const [level, setLevel] = useState(1);

    // * Refs
    const group = useRef<THREE.Group>(null!);

    // * setup
    useEffect(() => {
        restart();
    }, []);

    const restart = async () => {
        setSequenceIsPlaying(true);
        AllBlocksToWhite();
        setSequenceIndex(0);
        sequence.current = [];
        setColorsArr(pickColors(colorsArr));
        giveBlocksIndex();
        await sleep(550);
        addOneToSequence();
        setLevel(1);
    };

    const AllBlocksToWhite = () => {
        for(let i = 0;i < numOfBlocks;i++) {
            // @ts-expect-error instance of wasn't working will need to change
            group.current.children[i].children[0].children[0].material.uniforms.uColor.value = new THREE.Vector3(1, 1, 1);
        }
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
        sequence.current.push(Math.floor(Math.random() * numOfBlocks));
        playSequence();
    };

    const playSequence = async () => {
        // loop throught sequence array and animate each block in sequence
        for(let i = 0;i < sequence.current.length;i++) {
            const col = colorsArr[sequence.current[i]];
            // @ts-expect-error instance of wasn't working will need to change
            group.current.children[sequence.current[i]].children[0].children[0].material.uniforms.uColor.value = new THREE.Vector3(col.r, col.g, col.b);
            await sleep(1000);
            // @ts-expect-error instance of wasn't working will need to change

            group.current.children[sequence.current[i]].children[0].children[0].material.uniforms.uColor.value = new THREE.Vector3(1, 1, 1);
            // * add Time as white incase a sequence of duplicate colors 
            await sleep(300);
        }
        setSequenceIsPlaying(false);
    };

    // * animate successfully completing sequence and failing sequence
    const flashAllSquares2x = async (color: THREE.Vector3) => {

        let count = 1;

        await sleep(200);
        while(count <= 2) {
            // turn color
            for(let i = 0;i < numOfBlocks;i++) {
                // @ts-expect-error instance of wasn't working will need to change
                group.current.children[i].children[0].children[0].material.uniforms.uColor.value = color;
            }
            await sleep(500);
            //turn white
            for(let i = 0;i < numOfBlocks;i++) {
                // @ts-expect-error instance of wasn't working will need to change
                group.current.children[i].children[0].children[0].material.uniforms.uColor.value = new THREE.Vector3(1, 1, 1);
            }
            await sleep(250);
            count += 1;
        }

        await sleep(500);
    };

    // const flashCOlor = () => {

    // }


    // todo: fix any type
    // * handle events
    const handleBoardClick = async (e: any) => {
        // clicks allowed check (disabled for sequence)
        if(sequenceIsPlaying) return;
        // correct square was clicked check
        if(e.object.parent.parent.uColorIndex !=
            sequence.current[sequenceIndex]) {
            setSequenceIsPlaying(true);
            await flashAllSquares2x(new THREE.Vector3(1, 0, 0));
            restart();
            return;
        }
        // flash color
        setSequenceIsPlaying(true);
        e.object.material.uniforms.uColor.value = colorsArr[e.object.parent.parent.uColorIndex];
        await sleep(350);
        e.object.material.uniforms.uColor.value = { r: 1, g: 1, b: 1 };

        // end of sequence check
        if(sequence.current[sequenceIndex + 1] === undefined) {
            setSequenceIsPlaying(true);
            await flashAllSquares2x(new THREE.Vector3(0, 1, 0));
            setLevel(level + 1);
            addOneToSequence();
            return;
        }
        setSequenceIndex(sequenceIndex + 1);
        setSequenceIsPlaying(false);
    };


    return (
        <>

            <group scale={ width! > 900 ? 1 : .9 } position={ [width! > 900 ? 2 : -.9, width! > 900 ? -.5 : -1.8, 0] } ref={ group }>
                {
                    new Array(numOfBlocks).fill(0).fill(.6, 3, 6).fill(1.2, 6).map((y, i) => (
                        <group key={ i }>
                            <mesh onClick={ handleBoardClick } position={ [xPositions[i], yPositions[i], 0] }>
                                <Plane args={ [.55, .55, 20, 20] }>
                                    <simonGlowMaterial />
                                </Plane>
                            </mesh>
                        </group>
                    ))
                }

                <Select enabled={ false }>
                    <Rules restart={ restart } />
                    <mesh position={ [2.1, -.75, 0] }>
                        <Text
                            color="#00eeff"
                            fontSize={ .15 }
                        >
                            { level }
                        </Text>
                    </mesh>
                </Select>
            </group>


        </>
    );
};


export default Simon;



