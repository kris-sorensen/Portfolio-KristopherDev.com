import React from 'react';
import { useThree } from '@react-three/fiber';
import { Text } from '@react-three/drei';


function Title() {
    const { viewport } = useThree();

    return (
        <mesh position={ [-viewport.width / 2 * .8, viewport.height * .435, 0.001] }>
            <Text
                anchorX={ 'left' }
                color='black'
                fontSize={ .2 }
                font="https://fonts.gstatic.com/s/raleway/v14/1Ptrg8zYS_SKggPNwK4vaqI.woff">Software Engineer</Text>
        </mesh>
    );
}

export default Title;