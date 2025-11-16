import { TextInput, TextInputProps } from "react-native";

type InputBoxProps = TextInputProps & {
  placeholder?: string;
};

export default function InputBox({ placeholder = "Digite o valor", ...rest }: InputBoxProps) {
  return <TextInput placeholder={placeholder} {...rest} />;
}