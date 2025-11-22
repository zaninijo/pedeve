import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { borderRadius, colors, spacing, text } from '../styles/globalStyles';

const style = StyleSheet.create({
  btnOuter: {
    borderColor: colors.offBlack,
    borderWidth: 3,
    borderStyle: "solid",
    padding: spacing.m,
    borderRadius: borderRadius.l,
  }
});

export default function ButtonL({ color=colors.white, textColor=colors.offBlack, callback, disabled=false, children }) {
  return (
    <TouchableOpacity style={{...style.btnOuter, backgroundColor: color}} onPress={callback}>
      <Text style={ { ...text.xl, color: textColor, }}> { children } </Text>
    </TouchableOpacity>
  )
}

// TODO: Adicionar props "disabled" e modo disabled que não permite o callback do botão