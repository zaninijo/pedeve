// Fallback para rodar no navegador, uma câmera falsa.

import { useRef } from "react";
import { View, TextInput, Button, ToastAndroid } from "react-native";

export default function BarcodeScanner({
  cameraDevice = "front",
  scanCallback,
}) {
  const typedCode = useRef("");

  return (
    <View>
      <TextInput
        placeholder="Digite o código de barras"
        keyboardType="numeric"
        maxLength={13}
        onChangeText={(value) => (typedCode.current = value)}
      />
      <Button
        title="Adicionar Produto"
        onPress={() => {
          const codeStr = typedCode.current;
          if (codeStr.length < 13) {
            ToastAndroid.show("O código precisa ter 13 dígitos");
            return;
          }

          const code = Number(codeStr);
          scanCallback(code);
        }}
      />
    </View>
  );
}
