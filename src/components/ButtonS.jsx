import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { borderRadiusDict, colorDict, spacingDict, textStyle } from '../styles/globalStyles';

const style = StyleSheet.create({
  btnOuter: {
    borderColor: colorDict.offBlack,
    borderWidth: 2,
    borderStyle: "solid",
    padding: spacingDict.s,
    borderRadius: borderRadiusDict.s,
  }
});

export default function ButtonS({ color=colorDict.white, textColor=colorDict.offBlack, callback, disabled=false, children }) {
  return (
    <TouchableOpacity style={{...style.btnOuter, backgroundColor: color}} onPress={callback}>
      <Text style={ { ...textStyle.m, color: textColor, fontWeight: "bold", elevation: 2}}>{ children }</Text>
    </TouchableOpacity>
  )
}

// TODO: Adicionar props "disabled" e modo disabled que não permite o callback do botão