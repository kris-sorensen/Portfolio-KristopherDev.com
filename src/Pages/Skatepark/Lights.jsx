import React, { useRef } from 'react';
import * as three from 'three';
import { ContactShadows, SpotLight } from '@react-three/drei';
import { useControls, folder } from 'leva';


function Lights() {
    const light = useRef(null)

    //* Parameters
    const { shadowY } = useControls({
        shadows: folder({
            shadowY: { value: -2.8, min: -5, max: 0, step: .01 },
        })
    });

    const { dlX, dlY, dlZ, dlIntensity } = useControls({
        directionalLight: folder({
            dlX: { value: .49, min: -10, max: 10, step: .01 },
            dlY: { value: -1.1, min: -10, max: 10, step: .01 },
            dlZ: { value: 7.1, min: -10, max: 10, step: .01 },
            dlIntensity: { value: 1.55, min: 0, max: 10, step: .01 },
        })
    });

    const { x, y, Z, intensity, penumbra, distance, decay, angle, anglePower, attenuation } = useControls({
        spotlight: folder({
            x: { value: 0, min: -10, max: 10, step: .01 },
            y: { value: 3.6, min: -10, max: 10, step: .01 },
            Z: { value: 0, min: -10, max: 10, step: .01 },
            intensity: { value: 29, min: 0, max: 250, step: 1 },
            penumbra: { value: 1, min: 0, max: 1, step: .001 },
            distance: { value: 9.74, min: 0, max: 20, step: .01 },
            decay: { value: 1.65, min: 0, max: 6, step: .01 },
            angle: { value: .61, min: 0, max: Math.PI / 2, step: .001 },
            anglePower: { value: 7.5, min: 0, max: 20, step: .001 },
            attenuation: { value: 0, min: 0, max: 100, step: .001 },
        })
    })


    return (

        <group>
            <directionalLight
                // castShadow
                color="#dddddd"
                position={[dlX, dlY, dlZ]}
                intensity={dlIntensity}
            />
            <SpotLight
                position={[x, y, Z]}
                intensity={intensity}
                penumbra={penumbra}
                distance={distance}
                angle={angle}
                decay={decay}
                // color={'#ffffff'}
                color={'#60c0f0'}
                // color={'#0693E3'}
                // target-position={new three.Vector3(0, -2, 0)}
                anglePower={anglePower}
                attenuation={attenuation}
                castShadow
            />
            {/* <SpotLight
                position={[-x, y, Z]}
                intensity={intensity}
                penumbra={penumbra}
                distance={distance}
                angle={angle}
                decay={decay}
                color={'#ffffff'}
                // color={'#8066c0'}
                // color={"#F78DA7"}
                // target-position={new three.Vector3(0, -2, 0)}
                anglePower={anglePower}
                attenuation={attenuation}
            /> */}
            <ContactShadows
                opacity={1}
                scale={10}
                blur={1.5}
                far={12}
                resolution={256}
                color="#000000"
                position={[0, shadowY, 0]}
            />
        </group>
    )

}


export default Lights