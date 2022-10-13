import React from 'react';
import * as three from 'three';
import { Plane, Text } from '@react-three/drei';
import { useThree } from '@react-three/fiber';

const TextContainer = () => {



    return (
        <group>
            <group position={[0, 6.5, 0]}>
                <mesh position={[0, 0, 0]} >
                    <Text
                        fontSize={.6}
                    >Skatepark
                    </Text>
                    <meshBasicMaterial color={'white'} />
                </mesh>
                <mesh position={[0, -1, 0]} >
                    <Text
                        fontSize={.3}
                    >Custom Boards
                    </Text>
                    <meshBasicMaterial color={'white'} />
                </mesh>
            </group>
            <group position={[0, 4, 0]}>
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
            </group>

        </group>
    )
}

export default TextContainer;