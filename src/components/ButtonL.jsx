import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { borderRadius, colors, spacing, text } from '../styles/globalStyles';

const style = StyleSheet.create({
  btnOuter: {
    borderColor: colors.offBlack,
    borderWidth: "3px",
    borderStyle: "solid",
    padding: spacing.m,
    borderRadius: borderRadius.l,
  }
});

export default function ButtonL({ color=colors.white, textColor=colors.offBlack, callback, children }) {
  return (
    <TouchableOpacity style={{...style.btnOuter, backgroundColor: color}} onPressOut={callback}>
      <Text style={ { ...text.xl, color: textColor, }}> { children } </Text>
    </TouchableOpacity>
  )
}