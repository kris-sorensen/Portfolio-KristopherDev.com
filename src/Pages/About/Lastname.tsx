import { Plane, Text } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import React from 'react';


function Lastname() {
    const { viewport } = useThree();

    return (
        <group>
            <mesh position={ [viewport.width * -.02, viewport.height * -.35, 0.001] }>
                <Text
                    anchorX={ 'right' }
                    color='white'
                    fontSize={ .85 }
                    font="https://fonts.gstatic.com/s/raleway/v14/1Ptrg8zYS_SKggPNwK4vaqI.woff">
                    SORENSEN
                </Text>
            </mesh>
            <mesh position={ [-3, viewport.height * -.35, 0] }>
                <Plane args={ [6, 1.3] }>
                    <meshBasicMaterial color={ 'black' } />
                </Plane>
            </mesh>
        </group >
    );
}

export default Lastname;