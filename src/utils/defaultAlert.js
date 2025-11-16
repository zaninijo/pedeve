import { Alert } from "react-native";

export default function defaultAlert(callback = () => {}) {
    Alert.alert(
        "Serviço indisponível",
        "Estamos com dificuldades para fazer o seu pedido. Por favor, tente novamente mais tarde.",
        {
            text: "OK",
            onPress: callback
        },
        {cancelable: false}
    );
}