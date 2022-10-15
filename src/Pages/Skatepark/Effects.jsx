import React, { useRef, useEffect } from 'react';
import { useThree, useFrame, extend } from '@react-three/fiber';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass'
// import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import { FXAAShader } from 'three/examples/jsm/shaders/FXAAShader'
import { GammaCorrectionShader } from 'three/examples/jsm/shaders/GammaCorrectionShader'
import { EffectComposer } from '@react-three/postprocessing';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import { Effects } from '@react-three/drei';

extend({ ShaderPass, RenderPass })

function EffectsContainer() {
    const composer = useRef()
    const { scene, gl, size, camera } = useThree()

    useEffect(() => composer.current.setSize(size.width, size.height), [size])
    useFrame(() => composer.current.render(), 1)
    return (
        <EffectComposer ref={composer} args={[gl]}>
            <renderPass attachArray="passes" scene={scene} camera={camera} />
            <shaderPass
                attachArray="passes"
                args={[FXAAShader]}
                material-uniforms-resolution-value={[1 / size.width, 1 / size.height]}
                renderToScreen
            />
            <shaderPass attachArray="passes" args={[GammaCorrectionShader]} />
        </EffectComposer>
    )
}

export default EffectsContainer