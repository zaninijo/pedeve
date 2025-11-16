import { TouchableOpacity, Text } from "react-native";
import { ReactNode } from "react";

type PaymentMethodButtonProps = {
    methodName: string;
    icon: any;
    callback: (method: string) => void;
    children: ReactNode;
}

export default function PaymentMethodButton({methodName, icon, callback, children}: PaymentMethodButtonProps) {
    
    // TODO: Adicionar ícone SVG (e suporte a SVGs :P)
    return <TouchableOpacity onPress={() => callback(methodName)}>
        <Text>{children}</Text>
    </TouchableOpacity>
}