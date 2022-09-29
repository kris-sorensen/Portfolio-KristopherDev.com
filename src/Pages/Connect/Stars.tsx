import React from 'react';
import { Stars } from '@react-three/drei';

const StarsContainer = () => {
    return (
        <mesh>
            <Stars />
        </mesh>
    );
};

export default React.memo(StarsContainer);
