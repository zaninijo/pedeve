import { TextInput, TextInputProps } from "react-native";
import { borderRadiusDict, colorDict, spacingDict, textStyle } from "../styles/globalStyles";

type InputBoxProps = TextInputProps & {
  placeholder?: string;
};

export default function InputBox({ placeholder = "Digite o valor", ...rest }: InputBoxProps) {
  return <TextInput placeholder={placeholder} placeholderTextColor={colorDict.offBlack} {...rest} style={[
    {
      borderRadius: borderRadiusDict.s,
      borderColor: colorDict.offBlack,
      color: colorDict.offBlack,
      borderWidth: 1,
      padding: spacingDict.s,
    }
  ]}/>;
}