import { Text } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import React from 'react';


function Title() {
    const { viewport } = useThree();

    return (
        <mesh position={ [-viewport.width / 2 * .9, viewport.height * .4, 0.001] }>
            <Text
                anchorX={ 'left' }
                color='black'
                fontSize={ .2 }
                font="https://fonts.gstatic.com/s/raleway/v14/1Ptrg8zYS_SKggPNwK4vaqI.woff">Software Engineer</Text>
        </mesh>
    );
}

export default Title;