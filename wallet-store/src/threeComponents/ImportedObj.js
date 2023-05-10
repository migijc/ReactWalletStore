import React from "react";
import {useLoader} from '@react-three/fiber'
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader'

export default function ImportedObj() {
    const obj = useLoader(GLTFLoader, '../test.glb');

    return (
        <primitive object={obj.scene} />
    )
}