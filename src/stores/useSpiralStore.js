import create from 'zustand'

const useStore = create((set) => ({
    particleCount: 207000,
    particleSize: .005,
    radius: .34,
    spin: 1,
    randomness: 0, // will be zero
    randomnessPower: 10,
    insideColor: '#ffffff', // will be black
    outsideColor: '#ffffff',
    branches: 2,
}))

export default useStore