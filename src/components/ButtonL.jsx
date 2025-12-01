import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { borderRadiusDict, colorDict, spacingDict, textStyle } from '../styles/globalStyles';

const style = StyleSheet.create({
  btnOuter: {
    borderColor: colorDict.offBlack,
    borderWidth: 3,
    borderStyle: "solid",
    padding: spacingDict.m,
    borderRadius: 8,
  }
});

export default function ButtonL({ color=colorDict.white, textColor=colorDict.offBlack, callback, disabled=false, children }) {
  return (
    <TouchableOpacity style={{...style.btnOuter, backgroundColor: color, elevation: 2}} onPress={callback}>
      <Text style={ { ...textStyle.xl, color: textColor, }}> { children } </Text>
    </TouchableOpacity>
  )
}

// TODO: Adicionar props "disabled" e modo disabled que não permite o callback do botão