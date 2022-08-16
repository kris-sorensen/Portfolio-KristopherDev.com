import create from 'zustand'

const useStore = create((set) => ({
    power: 10,
    gravity: 2,
    opacity: .001,
    particleCount: 1500,
    friction: .99,
    particleSize: 3,
}))

export default useStore