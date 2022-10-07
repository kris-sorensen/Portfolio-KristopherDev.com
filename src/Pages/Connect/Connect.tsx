import React, { Suspense } from 'react';
import ConnectContent from './ConnectContent';
import ConnectCanvas from './ConnectCanvas';
import { Loader } from '@react-three/drei';

function Connect() {

    return (
        <>
            <Suspense fallback={ null }>
                {/* <div className="connect" > */ }
                <ConnectContent />
                <ConnectCanvas />
                {/* </div> */ }
            </Suspense>
            <Loader />
        </>
    );
}

export default Connect;