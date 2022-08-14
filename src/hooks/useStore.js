import create from 'zustand'
// import React from 'react'
// import Fireworks from '../Pages/About/Fireworks'

const useStore = create((set) => ({
    power: 5,
    gravity: .004,
    opacity: .0025,
    count: 150,
    friction: .99,
    particleSize: 4.5,
    // expendedFireworks: 0,
    // addExpendedFirework: () => set((state) => ({ expendedFireworks: state.expendedFireworks + 1 })),
    // resetExpendedFireworks: () => set(({ expendedFireworks: 0 })),
}))


export default useStore