"use client";

import { useEffect } from "react";
import { toast } from "sonner";

export default function AugmentedReality() {
    const showAlert = () => {
        toast("Place your camera to the invitation card to see our video!", {
            duration: 5000,
        });
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            showAlert();
        }, 100); // kasih jeda 100ms

        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            <button id="button-information" onClick={() => showAlert()}>!</button>

            <div className="arjs-loader">
                <div>Loading, please wait...</div>
            </div>

            <a-scene
                vr-mode-ui="enabled: true;"
                renderer='antialias: true; alpha: true; precision: medium;'
                embedded arjs='trackingMethod: best; sourceType: webcam; debugUIEnabled: false;'>

                <a-assets>
                    <video src="videos/video.mp4"
                        preload="auto" id="vid" response-type="arraybuffer" loop
                        crossOrigin="anonymous" webkit-playsinline="true" autoPlay muted playsInline
                    ></video>
                </a-assets>

                <a-nft
                    videohandler
                    type='nft' url='nft/undangan'
                    smooth="true" smoothCount="10" smoothTolerance="0.01" smoothThreshold="5"
                >
                    <a-video
                        src="#vid"
                        position="100 100 -500"
                        rotation="-90 0 0"
                        width='600'
                        height='200'
                        >
                    </a-video>
                </a-nft>

                <a-entity camera></a-entity>
            </a-scene>
        </>
    );
}
