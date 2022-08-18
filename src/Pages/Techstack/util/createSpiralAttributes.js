import * as THREE from 'three'
import useSpiralStore from '../../../stores/useSpiralStore'

const createSpiralAttributes = () => {
    const { insideColor, outsideColor, particleCount, radius, branches, randomnessPower, randomness } = useSpiralStore()
    //* Create Attributes Arrays
    const positions = new Float32Array(particleCount * 3)
    const colors = new Float32Array(particleCount * 3)
    const scales = new Float32Array(particleCount * 1)
    const randomnessArr = new Float32Array(particleCount * 3)
    // * Set Colors
    const innerColor = new THREE.Color(insideColor)
    const outerColor = new THREE.Color(outsideColor)

    //* Fill Attributes Arrays
    for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3

        // Position
        const randomRadius = Math.random() * radius

        const branchAngle = (i % branches) / branches * Math.PI * 2

        positions[i3] = Math.cos(branchAngle) * randomRadius
        positions[i3 + 1] = 0
        positions[i3 + 2] = Math.sin(branchAngle) * randomRadius
        // positions[i3] = 0
        // positions[i3 + 1] = 0
        // positions[i3 + 2] = 0



        // Randomness
        const randomX = Math.pow(Math.random(), randomnessPower) * (Math.random() < 0.5 ? 1 : - 1) * randomness * randomRadius
        const randomY = Math.pow(Math.random(), randomnessPower) * (Math.random() < 0.5 ? 1 : - 1) * randomness * randomRadius
        const randomZ = Math.pow(Math.random(), randomnessPower) * (Math.random() < 0.5 ? 1 : - 1) * randomness * randomRadius

        randomnessArr[i3 + 0] = randomX
        randomnessArr[i3 + 1] = randomY
        randomnessArr[i3 + 2] = randomZ

        // Color
        const mixedColor = innerColor.clone()
        mixedColor.lerp(outerColor, randomRadius / radius)

        colors[i3] = mixedColor.r
        colors[i3 + 1] = mixedColor.g
        colors[i3 + 2] = mixedColor.b

        //Scales
        scales[i] = Math.random()
    }
    return { positions: positions, colors: colors, scales: scales, randomness: randomnessArr }
}

export default createSpiralAttributes