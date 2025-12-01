import { ReactNode } from "react";
import { Pressable, Text } from "react-native";
import { colorDict, textStyle } from "../styles/globalStyles";

type LinkProps = {
  onPress: () => void;
  textAlign?: "auto" | "left" | "right" | "center" | "justify",
  children: ReactNode;
};

export default function RedirectPressable({ onPress, textAlign="left", children }: LinkProps) {
  return (
    <Pressable onPress={onPress}>
      <Text
        style={[
          textStyle.s,
          {
            textAlign: textAlign,
            color: "020402",
            opacity: 0.7,
            textDecorationLine: "underline"
          },
        ]}
      >
        {children}
      </Text>
    </Pressable>
  );
}
