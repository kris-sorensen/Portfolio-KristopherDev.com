import React, { useRef } from 'react';
import { Stars } from '@react-three/drei'

const StarsContainer = () => {
    const star = useRef();
    console.log(star.current)
    return (
        <mesh>
            <Stars ref={star} />
        </mesh>
    );
}

export default StarsContainer;
