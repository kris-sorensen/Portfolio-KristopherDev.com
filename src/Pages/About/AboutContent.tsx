import * as THREE from 'three';
import React from 'react';
import { Flex, Box } from '@react-three/flex';
import { useThree } from '@react-three/fiber';
import { Plane, Text, useAspect } from '@react-three/drei';

//todo: margin instead of position to fix weird loading issue
const AboutContent = () => {
    const { size } = useThree();
    const [vpWidth, vpHeight] = useAspect(size.width, size.height);

    return (
        <Flex
            size={ [vpWidth, vpHeight, 0] }
            position={ [-vpWidth / 2, vpHeight / 2, 0] }

        >
            {/* All */ }
            <group position={ [-.8, -.3, 0] }>
                <Box
                    justifyContent={ 'center' }
                    marginTop={ 2 }
                    marginLeft={ 4 }
                >
                    {/* Name  */ }
                    <Box >
                        <mesh position={ [-.5, 0, 0] } >

                            <Text
                                fontSize={ .45 }>
                                <meshBasicMaterial color='black' />
                                `${ `{ KRISTOPHER }` }`
                            </Text>

                        </mesh>
                    </Box>
                    {/* All but name */ }
                    <Box>
                        {/* left side  */ }
                        <Box >
                            {/* Title */ }
                            <Box>
                                <mesh position={ [-1, -.3, 0] }>
                                    <Plane args={ [1.3, .25] } >
                                        <meshBasicMaterial color='black' />
                                    </Plane>
                                    <Text position={ [0, 0, .01] }
                                        fontSize={ .08 }
                                    ><meshBasicMaterial color='#ffffff' />#SOFTWARE ENGINEER</Text>
                                </mesh>
                            </Box>
                            {/* Paragraphs */ }
                            <Box flexWrap="wrap"  >
                                <mesh position={ [.0, -.7, 0] }>
                                    <Text
                                        textAlign="left"
                                        maxWidth={ 3.3 }
                                        fontSize={ .12 }
                                        lineHeight={ 1.7 }
                                    ><meshBasicMaterial color='black' />Hello and welcome to my site! I am a Software Engineer with 7+ years of experience creating memorable, and beautiful web experiences that captivate and engage guests.
                                    </Text>
                                </mesh>
                            </Box>
                            {/* Paragraph 2 */ }
                            <Box   >
                                <mesh position={ [0, -1.1, 0] }>
                                    <Text
                                        textAlign="left"
                                        maxWidth={ 3.3 }
                                        fontSize={ .12 }
                                        lineHeight={ 1.6 }
                                    ><meshBasicMaterial color='black' />
                                        I love playing with the newest technologies. Especially technologies that can be used to enhance user experience and improve performance. I feel that a website should be performant, emotionally engaging, and memorable. There is no greater joy to me than seeing a users face light up as they interact with my software.
                                    </Text>
                                </mesh>
                            </Box>
                            {/* Btn */ }
                            <mesh position={ [3.6, -4., 0] }>
                                <Plane position={ [0, 0, .01] } args={ [1.62, .5] }>
                                    <meshBasicMaterial color='black' />
                                </Plane>
                                <Plane position={ [0, 0, .0101] } args={ [1.6, .48] }>
                                    <meshBasicMaterial color='white' />
                                </Plane>
                                <Text color='black' position={ [0, 0, .03] }
                                    fontSize={ .15 }
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