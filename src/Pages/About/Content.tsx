import { Plane, Text } from '@react-three/drei';
import { extend, useThree } from '@react-three/fiber';
import React from 'react';
import useWindowSize from '../../hooks/useWindowSize';
import BwMaterial from '../../shaders/bw';
import OutlineMaterial from '../../shaders/outline';

extend({ OutlineMaterial });
extend({ BwMaterial });

function Content() {
    const { viewport } = useThree();
    const { width, height } = useWindowSize();

    return (
        <group position={ [width! > 900 ? 0 : 3, width! > 900 ? 1 : 2.15, 0] }>
            <mesh position={ [-4.5, viewport.height / 18, 0.001] }>
                <Text
                    anchorX={ 'left' }
                    color='black'
                    fontSize={ width! > 900 ? .11 : .13 }
                    font="https://fonts.gstatic.com/s/raleway/v14/1Ptrg8zYS_SKggPNwK4vaqI.woff">
                    Hello and welcome to my site!
                </Text>

            </mesh>
            <mesh position={ [-4.5, width! > 900 ? viewport.height / 30 : .17, 0.001] }>
                <Text
                    anchorX={ 'left' }
                    anchorY={ 'top' }
                    color='black'
                    fontSize={ width! > 900 ? .11 : .12 }
                    maxWidth={ width! > 900 ? 3 : 3.2 }
                    lineHeight={ width! > 900 ? 1.8 : 1.5 }
                    font="https://fonts.gstatic.com/s/raleway/v14/1Ptrg8zYS_SKggPNwK4vaqI.woff">
                    I am a Software Engineer with 7+ years of experience creating memorable, and beautiful web experiences that captivate and engage visitors.
                </Text>

            </mesh>
            <mesh position={ [-4.5, viewport.height / -16, 0.001] }>
                <Text
                    anchorX={ 'left' }
                    anchorY={ 'top' }
                    color='black'
                    fontSize={ width! > 900 ? .11 : .12 }
                    maxWidth={ width! > 900 ? 3 : 3.2 }
                    lineHeight={ width! > 900 ? 1.8 : 1.5 }
                    font="https://fonts.gstatic.com/s/raleway/v14/1Ptrg8zYS_SKggPNwK4vaqI.woff">
                    I am strongly experienced with React, Three.js, React-Three-Fiber, GLSL/Shaders, Typescript, Javascript, Redux, Zustand, creating custom animations, and creating animations using GSAP, React-Spring, and Framer Motion. I also have experience using Node.js, Express, Jest, AWS, Webpack, Docker, PostgreSQL, MongoDB, and Mongoose.
                </Text>
            </mesh>

            {/* <mesh position={ [-3, .1, 0] }>
                <Plane args={ [3.8, 3.5] }> */}

            {/* <outlineMaterial />
                </Plane>
            </mesh> */}
        </group >
    );
}

export default Content;