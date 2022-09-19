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
        <group position={ [width! > 900 ? 0 : 3.15, width! > 900 ? 1 : 2.2, 0] }>
            <mesh position={ [-4.5, viewport.height / 18, 0.001] }>
                <Text
                    anchorX={ 'left' }
                    color='black'
                    fontSize={ .11 }
                    font="https://fonts.gstatic.com/s/raleway/v14/1Ptrg8zYS_SKggPNwK4vaqI.woff">
                    Hello and welcome to my site!
                </Text>

            </mesh>
            <mesh position={ [-4.5, viewport.height / 30, 0.001] }>
                <Text
                    anchorX={ 'left' }
                    anchorY={ 'top' }
                    color='black'
                    fontSize={ .11 }
                    maxWidth={ 3 }
                    lineHeight={ 1.8 }
                    font="https://fonts.gstatic.com/s/raleway/v14/1Ptrg8zYS_SKggPNwK4vaqI.woff">
                    I am a Software Engineer with 7+ years of experience creating memorable, and beautiful web experiences that captivate and engage visitors.
                </Text>

            </mesh>
            <mesh position={ [-4.5, viewport.height / -16, 0.001] }>
                <Text
                    anchorX={ 'left' }
                    anchorY={ 'top' }
                    color='black'
                    fontSize={ .11 }
                    maxWidth={ 3 }
                    lineHeight={ 1.8 }
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