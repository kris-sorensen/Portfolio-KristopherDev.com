import { useThree } from '@react-three/fiber';
import useFireworksStore from '../../../stores/useFireworksStore'

// * fill attribute arrays
const createFireworkAttributes = (explodeHere) => {
    const { mouse, viewport } = useThree()
    const { power, particleCount } = useFireworksStore()

    // * attributes
    const colors = new Float32Array(particleCount * 3)
    const positions = new Float32Array(particleCount * 3)
    const velocities = new Float32Array(particleCount)
    const index = new Float32Array(particleCount)

    for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3
        // * positions
        if (explodeHere.length > 0) {
            //autofire explode here positions
            positions[i3] = explodeHere[0]
            positions[i3 + 1] = explodeHere[1]
            positions[i3 + 2] = 0
        } else {
            //mouse click positions
            positions[i3] = (mouse.x * viewport.width) / 2
            positions[i3 + 1] = (mouse.y * viewport.height) / 2
            positions[i3 + 2] = 0
        }

        // * velocities
        velocities[i] = Math.random() * power

        // * index
        index[i] = i

        // * colors
        //red
        if (i % 6 == 0) {
            colors[i3] = 1
            colors[i3 + 1] = 0
            colors[i3 + 2] = 0
        }
        //blue
        else if (i % 10 == 0) {
            colors[i3] = 0
            colors[i3 + 1] = 0
            colors[i3 + 2] = 1
        }
        // purple
        else if (i % 7) {
            colors[i3] = .498
            colors[i3 + 1] = .031
            colors[i3 + 2] = 1
        }
    }
    return { colors: colors, positions: positions, velocities: velocities, index: index }
}

export default createFireworkAttributes