import { TouchableOpacity, Text } from "react-native";



export default function PaymentMethodButton({methodName, icon, callback}) {
    
    // TODO: Adicionar ícone SVG (e suporte a SVGs :P)
    return <TouchableOpacity onPress={callback}>
        <Text>{methodName}</Text>
    </TouchableOpacity>
}