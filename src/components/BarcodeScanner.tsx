import { useEffect } from "react";
import { Text } from "react-native";
import { useCameraPermission, useCameraDevice, Camera, useCodeScanner, CameraPosition } from "react-native-vision-camera"
import defaultAlert from "../utils/defaultAlert";
import { useNavContext } from "../contexts/NavContext";

type BarcodeScannerProps = {
  cameraDevice?: CameraPosition;
  scanCallback: (code: number) => void
}

export default function BarcodeScanner({ cameraDevice="front", scanCallback }: BarcodeScannerProps) {
  const { hasPermission, requestPermission } = useCameraPermission();
  const { OverrideActiveScreen } = useNavContext()

  useEffect(() => {
    if (hasPermission) return;

    requestPermission().then((permissionValue) => {
      if (permissionValue) return;
      defaultAlert(() => {
        OverrideActiveScreen("home");
      })
    });
  }, [hasPermission]);

  const device = useCameraDevice(cameraDevice);

  if (!device) {
    return <Text>
      Não foi possível acessar a câmera do dispositivo.
    </Text>
  }

  const codeScanner = useCodeScanner(
    {
      codeTypes: ["ean-13"],
      onCodeScanned: (codes) => {
        if (!codes[0].value) return;
        scanCallback(Number(codes[0].value))
      }
    },
  )

  return <Camera device={device} isActive={true} codeScanner={codeScanner} />
}