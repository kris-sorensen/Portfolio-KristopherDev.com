import * as THREE from 'three'


const makePlane = (planeMesh, trailTexture, scene) => {
    const plane = planeMesh.clone()
    plane.scale.set(.0015, .0015, .0015)
    plane.position.set(0, 0, 0)
    plane.rotation.set(0, 0, 0)
    plane.updateMatrixWorld();

    plane.traverse((object) => { // Add to all parts of Plane
        if (object instanceof THREE.Mesh) {
            object.castShadow = true
            object.receiveShadow = true
        }
    })

    // Plane Trails
    const trail = new THREE.Mesh(
        new THREE.PlaneGeometry(1, 2),
        new THREE.MeshStandardMaterial({
            roughness: 0.4,
            metalness: 0,
            transparent: true,
            opacity: 1,
            alphaMap: trailTexture,
            color: new Color(1.0, 1.0, 1.0)
        })
    )
    trail.rotateX(Math.PI)
    trail.translateY(1, 1)

    const group = new THREE.Group()
    group.add(plane)
    group.add(trail)

    scene.add(group)

    return {
        group,
        rot: Math.random() * Math.PI * 2.0,
        rad: Math.random() * Math.PI * 0.45 + .2,
        yOff: (parameters.radius + .2) + Math.random() * 1.0,
        randomAxis: new Vector3(random(), random(), random()).normalize(),
        randomAxisRot: Math.random() * Math.PI * 2,
    }
}

const random = () => {
    return Math.random() * 2 - 1
}


export default makePlane;