import React, { useRef } from 'react';
import * as three from 'three';
import { useControls } from 'leva';
import { ContactShadows, SpotLight, useDepthBuffer } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { PointLight } from 'three';




function Lights() {

    useFrame(({ camera }) => {
        // console.log('x', camera.position.x)
        // console.log('y', camera.position.y)
        // console.log('z', camera.position.z)

    })
    const light = useRef()
    // useHelper(light, three.pointLightHelper, 'red')
    const { shadowY } = useControls({
        shadowY: { value: -3.29, min: -5, max: 0, step: .01 },
    });
    const { ambientIntensity } = useControls({
        ambientIntensity: { value: 0, min: 0.0001, max: 1, step: .0001 },
    });

    // const lightParams = useControls({
    //     ly: { value: 3.3, min: 0, max: 20, step: .01 },
    //     lz: { value: 0, min: 0, max: 20, step: .01 },
    //     decay: { value: 2, min: 0, max: 20, step: .01 },
    //     distance: { value: 7.4, min: 0, max: 20, step: .01 },
    //     intensity: { value: 250, min: 0, max: 250, step: 1 },
    // })

    const { spotLightX, spotLightY, spotLightZ, intensity, penumbra, distance, decay, angle, anglePower, attenuation } = useControls({
        spotLightX: { value: -2.5, min: -10, max: 10, step: .01 },
        spotLightY: { value: 4, min: -10, max: 10, step: .01 },
        spotLightZ: { value: 0, min: -10, max: 10, step: .01 },
        intensity: { value: 5, min: 0, max: 250, step: 1 },
        penumbra: { value: 1, min: 0, max: 1, step: .001 },
        distance: { value: 8.2, min: 0, max: 20, step: .01 },
        decay: { value: 1.65, min: 0, max: 6, step: .01 },
        angle: { value: .61, min: 0, max: Math.PI / 2, step: .001 },
        anglePower: { value: 7.5, min: 0, max: 20, step: .001 },
        attenuation: { value: 2.8, min: 0, max: 100, step: .001 },
    })

    const depthBuffer = useDepthBuffer({ frames: 1 })

    return (

        <>
            {/* <ambientLight intensity={ambientIntensity} /> */}
            <ContactShadows
                opacity={.8}
                scale={8}
                blur={1.5}
                far={10}
                resolution={256}
                color="#000000"
                position={[0, shadowY, 0]}
            />

            <SpotLight
                position={[spotLightX, spotLightY, spotLightZ]}
                intensity={intensity}
                penumbra={penumbra}
                distance={distance}
                angle={angle}
                decay={decay}
                // color={'#60c0f0'}
                depthBuffer={depthBuffer}
                // target-position={new three.Vector3(0, -2, 0)}
                anglePower={anglePower}
                attenuation={attenuation}
                castShadow
            />
            <SpotLight
                position={[-spotLightX, spotLightY, spotLightZ]}
                intensity={intensity}
                penumbra={penumbra}
                distance={distance}
                angle={angle}
                decay={decay}
                // color={'#8066c0'}
                depthBuffer={depthBuffer}
                // target-position={new three.Vector3(0, -2, 0)}
                anglePower={anglePower}
                attenuation={attenuation}

            />


            {/* <pointLight
                ref={light}
                shadow-mapSize-height={5012}
                shadow-mapSize-width={5012}
                intensity={lightParams.intensity}
                angle={lightParams.angle}
                distance={lightParams.distance}
                position={[0, lightParams.ly, lightParams.lz]}
                castShadow
                decay={lightParams.decay}
                color={'#60c0f0'}
            /> */}
            {/* <hemisphereLight args={["0xffffff", "0xffffff", .2]} /> */}
        </>
    )

}


export default Lights