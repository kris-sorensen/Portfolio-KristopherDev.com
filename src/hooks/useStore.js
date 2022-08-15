import create from 'zustand'
// import React from 'react'
// import Fireworks from '../Pages/About/Fireworks'

const useStore = create((set) => ({
    power: 10,
    gravity: 2,
    opacity: .001,
    count: 1000,
    friction: .99,
    particleSize: 4,
}))


export default useStore