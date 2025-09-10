import 'aframe';
import 'mind-ar/dist/mindar-image-aframe.prod.js';

export default function App()
{
    return(
        <>
     
            <a-scene
            mindar-image="imageTargetSrc: https://p-alom-a.github.io/ar_vsnr/targets-cup.mind;"
            color-space="sRGB"
            renderer="colorManagement: true, physicallyCorrectLights"
            vr-mode-ui="enabled: false"
            device-orientation-permission-ui="enabled: false"
            >
            {/* <!-- Chargement des ressources 3D --> */}
            <a-assets>
            
                <a-asset-item
                id="vinyleModel"
                src="https://p-alom-a.github.io/ar_vsnr/models/vinyle2.glb"
                ></a-asset-item>
             
            </a-assets>

            {/* <!-- Caméra de la scène, positionnée à l'origine sans contrôle de regard --> */}
            <a-camera position="0 0 0" look-controls="enabled: false"></a-camera>

            
            
            {/* with wave*/}
           
         
            <a-entity mindar-image-target="targetIndex: 0">

                <a-gltf-model
                position="0 0 0"
                scale="0.4 0.4 0.4"
                src="#vinyleModel"
                animation="property: rotation; to: 0 0 -360; loop: true; dur: 8000; easing: linear"
                ></a-gltf-model>


                <a-ring color="pink" radius-inner="0.3" radius-outer="0.35" position="0 0 0.01"
                animation="property: scale; from: 1 1 1; to: 3 3 3; dur: 2000; loop: true; easing: linear"
                animation__fade="property: opacity; from: 1; to: 0; dur: 2000; loop: true">
                </a-ring>

                <a-ring color="pink" radius-inner="0.3" radius-outer="0.35" position="0 0 0.01"
                animation="property: scale; from: 1 1 1; to: 3 3 3; dur: 2000; delay: 1000; loop: true; easing: linear"
                animation__fade="property: opacity; from: 1; to: 0; dur: 2000; delay: 1000; loop: true">
                </a-ring>

            </a-entity>


           



  

            </a-scene>

        </>
    )
}