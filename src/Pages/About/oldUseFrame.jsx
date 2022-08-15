// useFrame(() => {
    //     if (!stopEverything.current) {
    //         if (matRef.current.opacity <= 0 && meshRef.current.visible) {
    //             runFrame.current = false
    //             matRef.current.opacity = 0
    //             meshRef.current.visible = false
    //         }
    //         else if (runFrame.current) {
    //             // console.log(meshRef.current)
    //             matRef.current.opacity -= opacity
    //             if (matRef.current.opacity < .960) colorWhite.current = false
    //             // Move Points
    //             for (let i = 0; i < count; i++) {
    //                 //Add friction to slowdown fireworks over time
    //                 velocities[i] = velocities[i] * friction

    //                 const point = meshRef.current.children[0].children[i]
    //                 //Move x and y of points
    //                 point.position.x += ((Math.cos(angleIncrement * i)) * .01) * velocities[i]
    //                 point.position.y += ((Math.sin(angleIncrement * i)) * .01) * velocities[i] - gravity

    //                 // Change Firework from white to colors after initial flash of white. 
    //                 if (colorWhite.current) {
    //                     if (matRef.current.opacity <= .965) {
    //                         if (i % 10 === 0) {
    //                             point.children[0].color.setHex(0xffffff)
    //                         }
    //                         if (i % 6 === 0) {
    //                             point.children[0].color.setHex(0x504DF4)
    //                         }
    //                         if (i % 7 === 0) {
    //                             point.children[0].color.setHex(0x1738B7)
    //                         }
    //                         else {
    //                             point.children[0].color.setHex(color)
    //                         }
    //                     }
    //                 }
    //             }
    //         }
    //     }
    // })

    // let positions = [];

    // if (explodeHere instanceof Array) {
    //     positions = Array.from({ length: count }, (i) => [
    //         explodeHere[0],
    //         explodeHere[1],
    //         0
    //     ])
    // }
    // else {
    //     positions = Array.from({ length: count }, (i) => [
    //         // Get Spot of Mouse Click
    //         (mouse.x * viewport.width) / 2,
    //         (mouse.y * viewport.height) / 2,
    //         0
    //     ])
    //     // console.log('mouse explode here', positions)
    // }