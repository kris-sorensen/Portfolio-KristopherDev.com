const createParticleAttributes = ({ count, x, y, speedMax, speedMin, velocitiesMin, velocitiesMax }) => { //todo: move to util func
    const positions = new Float32Array(count * 3)
    const speeds = new Float32Array(count * 1)
    const velocities = new Float32Array(count * 1)

    for (let i = 0; i < count; i++) {
        const i3 = i * 3

        //* Positions 
        //todo: add small amounts of randomness to y, x?
        positions[i3] = x + Math.random()
        positions[i3 + 1] = y + Math.random()
        positions[i3 + 2] = 0

        //* Speeds
        speeds[i] = Math.random() * (speedMax - speedMin) + speedMin;


        //* Velocities
        velocities[i] = Math.random() * (velocitiesMax - .2) + .2;
    }

    return { positions: positions, velocities: velocities, speeds: speeds }
}


export default createParticleAttributes
