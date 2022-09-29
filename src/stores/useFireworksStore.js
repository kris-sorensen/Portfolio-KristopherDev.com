import create from 'zustand'

const useStore = create((set) => ({
    power: 9.5,
    gravity: 2,
    opacity: .001,
    particleCount: 1100,
    friction: .99,
    particleSize: 3,
}))

export default useStore