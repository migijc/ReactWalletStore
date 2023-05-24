import React from "react";
import { Canvas } from "@react-three/fiber";
import ImportedObj from "./ImportedObj";
import { Environment, OrbitControls } from "@react-three/drei";

export default function ThreeEnv() {

    return(
        <div className="canvas-wrapper">
        <Canvas className="canvas">
            <OrbitControls/>
            <Environment files="../sky.hdr" background={true} />
            <ImportedObj/>
        </Canvas> 
        </div>


    )
}