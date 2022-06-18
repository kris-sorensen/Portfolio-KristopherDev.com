import { Canvas, useFrame } from "@react-three/fiber";
import { useControls } from 'leva';


const parameters = {}
parameters.radius = 8
parameters.bumpScale = .05
parameters.sheen = .4
parameters.sheenRoughness = .75
parameters.clearcoat = .5
parameters.bumpScale = .05
parameters.envMapIntensity = .4
parameters.rotationSpeed = .08
parameters.planeRad = 1.25
parameters.planeSpeed = .4
parameters.sunlightIntensity = 2
parameters.numberOfPlanes = 8

const CanvasContainer = () => {
    console.log(parameters)

    return (
        <Canvas>
            {/* <World /> */}

        </Canvas>
    );
}

const World = () => {
    return ( 

    );
}



export default CanvasContainer;