import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { borderRadius, colors, spacing, text } from '../styles/globalStyles';

const style = StyleSheet.create({
  btnOuter: {
    borderColor: colors.offBlack,
    borderWidth: "2px",
    borderStyle: "solid",
    padding: spacing.m,
    borderRadius: borderRadius.s,
  }
});

export default function ButtonS({ color=colors.white, textColor=colors.offBlack, callback, children }) {
  return (
    <TouchableOpacity style={{...style.btnOuter, backgroundColor: color}} onPressOut={callback}>
      <Text style={ { ...text.m, color: textColor, }}> { children } </Text>
    </TouchableOpacity>
  )
}