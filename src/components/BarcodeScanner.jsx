import { useCameraPermission, useCameraDevice, Camera, useCodeScanner } from "react-native-vision-camera"

export default (cameraDevice = "front", scanCallback) => {
    const device = useCameraDevice(cameraDevice);

    const { hasPermission, requestPermission } = useCameraPermission();
    const codeScanner = useCodeScanner(
        {
            codeTypes: ["ean-13"],
            onCodeScanned: scanCallback
        },
    )
    
    return <Camera device={device} isActive={true}></Camera>
}