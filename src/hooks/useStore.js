import create from 'zustand'
// import React from 'react'
// import Fireworks from '../Pages/About/Fireworks'

const useStore = create((set) => ({
    power: 10,
    gravity: 2,
    opacity: .001,
    count: 1500,
    friction: .99,
    particleSize: 3,
}))


export default useStore