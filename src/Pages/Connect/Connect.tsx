import React, {Suspense} from 'react';
import ConnectContent from './ConnectContent';
import ConnectCanvas from './ConnectCanvas';
import {Loader} from '@react-three/drei';

function Connect() {

    return (
        <Suspense fallback={<Loader />}>
            <div className="connect" >
                <ConnectContent />
                <ConnectCanvas />
            </div>
        </Suspense>
    );
}

export default Connect;