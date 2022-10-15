import React from 'react';
import * as three from 'three';
import { Plane, Text } from '@react-three/drei';
import { useThree } from '@react-three/fiber';

const TextContainer = () => {



    return (
        <group>
            <group position={[0, 5.5, 0]}>
                <mesh position={[0, 0, 0]} >
                    <Text
                        font={'/Skateboard.ttf'}
                        // font={'/Ventilla.ttf'}
                        fontSize={.85}
                        letterSpacing={.4}
                        transparent={true}
                        outlineOffsetX={'10%'}
                        outlineOffsetY={'10%'}
                        outlineBlur={'30%'}
                        outlineOpacity={0.1}
                        outlineColor="#ffffff"
                        color="#ffffff"

                    >Skate-Factory
                    </Text>
                    <meshBasicMaterial
                        color={'white'}


                    />
                </mesh>
                <mesh position={[0, -1.2, 0]} >
                    <Text
                        fontSize={1.3}
                        font={'/Ventilla.ttf'}
                    >Custom Boards
                    </Text>
                    <meshBasicMaterial color={'white'} />
                </mesh>
            </group>
            {/* <group position={[0, 4, 0]}>
                <mesh position={[-6.5, 0, 0]} >
                    <Text
                        fontSize={.3}
                    >Color
                    </Text>
                    <meshBasicMaterial color={'white'} />
                </mesh>
                <mesh position={[6.5, 0, 0]} >
                    <Text
                        fontSize={.3}
                    >Parts
                    </Text>
                    <meshBasicMaterial color={'white'} />
                </mesh>
            </group> */}

        </group>
    )
}

export default TextContainer;