import { StyleSheet } from "react-native";

export const colors = {
    rubyRed: "#EF6565",
    peacockTeal: "#00B295",
    white: "#ffffff",
    creamyWhite: "#F6F0ED",
    offBlack: "#020402"
}

export const spacing = {
    l: "16",
    m: "14",
    s: "10"
}

export const borderRadius = {
    l: "8",
    s: "4"
}

export const text = StyleSheet.create({
    heading: {
        fontFamily: "Baloo2_700Bold",
        fontSize: 72,
        fontWeight: "700",
        letterSpacing: -0.6,
    },

    xl: {
        fontFamily: "Inter_700Bold",
        fontSize: 20,
        fontWeight: "700",
        letterSpacing: 0,
    },

    l: {
        fontFamily: "Inter_600SemiBold",
        fontSize: 17,
        fontWeight: "600",
        letterSpacing: 0,
    },

    m: {
        fontFamily: "Inter_400Regular",
        fontSize: 16,
        fontWeight: "400",
        letterSpacing: 0,
    },

    m_mono: {
        fontFamily: "Roboto_Mono_400Regular",
        fontSize: 16,
        fontWeight: "400",
        letterSpacing: 0,
    },

    s: {
        fontFamily: "Inter_400Regular",
        fontSize: 14,
        fontWeight: "400",
        letterSpacing: 0,
    },
});