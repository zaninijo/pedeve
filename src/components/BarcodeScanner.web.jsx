// Fallback para rodar no navegador, uma câmera falsa.

import { View } from 'react-native'

export default (cameraDevice = "front", scanCallback) => {

    return <View>
        <input type="text" placeholder="Digite o código de barras"/>
    </View>
}