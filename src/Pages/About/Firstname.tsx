import { Plane, Text } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import React from 'react';
import useWindowSize from '../../hooks/useWindowSize';


function Firstname() {
    const { viewport } = useThree();
    const { width, height } = useWindowSize();

    return (
        <group position={ [0, width! > 900 ? 0 : viewport.height * .1, 0] }>
            <mesh position={ [viewport.width * .02, viewport.height * .35, 0.001] }>
                <Text
                    anchorX={ width! > 900 ? 'left' : 'center' }
                    color='black'
                    fontSize={ width! > 900 ? .85 : .35 }
                    font="https://fonts.gstatic.com/s/raleway/v14/1Ptrg8zYS_SKggPNwK4vaqI.woff">
                    KRISTOPHER
                </Text>
            </mesh>
            <mesh position={ [width! > 900 ? 3 : 0, viewport.height * .35, 0] }>
                <Plane args={ [6, width! > 900 ? 1.3 : .8] }>
                    <meshBasicMaterial color={ '#ff0044' } />
                </Plane>
            </mesh>
        </group >
    );
}

export default Firstname;