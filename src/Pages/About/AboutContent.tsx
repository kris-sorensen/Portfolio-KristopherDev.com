import * as THREE from 'three';
import React, { } from 'react';
import { } from '@react-three/fiber';
import {Flex, Box} from '@react-three/flex';
import {useThree} from '@react-three/fiber';
import {Plane, Text, useAspect} from '@react-three/drei';

//todo: margin instead of position to fix weird loading issue
const AboutContent=() => {
    const {size}=useThree();
    const [vpWidth, vpHeight]=useAspect(size.width, size.height);


    return (
        <Flex
            size={[vpWidth, vpHeight, 0]}
            position={[-vpWidth/2, vpHeight/2, 0]}

        >
            {/* All */}
            <group position={[-0, .2, 0]}>
                <Box
                    justifyContent={'center'}
                    marginTop={2}
                    marginLeft={4}

                >
                    {/* Name  */}
                    <Box >
                        <mesh >

                            <Text
                                fontSize={.55}>
                                <meshBasicMaterial color='white' />
                                `${`{ KRISTOPHER }`}`
                            </Text>

                        </mesh>
                    </Box>
                    {/* All but name */}
                    <Box>
                        {/* left side  */}
                        <Box >
                            {/* Title */}
                            <Box>
                                <mesh position={[-.4, -.4, 0]}>
                                    <Plane args={[2.1, .3]} />
                                    <Text
                                        fontSize={.15}
                                    ><meshBasicMaterial color='#222' />#SOFTWARE ENGINEER</Text>
                                </mesh>
                            </Box>
                            {/* Paragraphs */}
                            <Box flexWrap="wrap"  >
                                <mesh position={[.8, -.9, 0]}>
                                    <Text
                                        textAlign="left"
                                        maxWidth={4.5}
                                        fontSize={.15}
                                        lineHeight={1.7}
                                    ><meshBasicMaterial color='white' />Hello and welcome to my site! I am a Software Engineer with 7+ years of experience creating memorable, and beautiful web experiences that captivate and engage guests.
                                    </Text>
                                </mesh>
                            </Box>
                            {/* Paragraph 2 */}
                            <Box   >
                                <mesh position={[.8, -1.3, 0]}>
                                    <Text
                                        textAlign="left"
                                        maxWidth={4.5}
                                        fontSize={.15}
                                        lineHeight={1.6}
                                    ><meshBasicMaterial color='white' />
                                        I love playing with the newest technologies. Especially technologies that can be used to enhance user experience and improve performance. I feel that a website should be performant, emotionally engaging, and memorable. There is no greater joy to me than seeing a users face light up as they interact with my software.
                                    </Text>
                                </mesh>
                            </Box>
                            {/* Btn */}
                            <mesh position={[-.4, -3.8, 0]}>
                                <Plane args={[2.2, .5]}>
                                    <meshBasicMaterial color='white' />
                                </Plane>
                                <Plane args={[2.18, .48]}>
                                    <meshBasicMaterial color='black' />
                                </Plane>
                                <Text
                                    fontSize={.15}
                                >Techstack</Text>
                            </mesh>
                        </Box>

                    </Box>
                </Box>
            </group>
        </Flex>
    );
};

export default AboutContent;