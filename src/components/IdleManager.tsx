import React, { useEffect, useRef, useCallback } from "react";
import {
  View,
  StyleSheet,
  AppState,
  AppStateStatus,
  PanResponder,
} from "react-native";

interface IdleCallback {
  cb: () => void;
  timeout: number;
}

interface IdleTouchLayerProps {
  callbacks: IdleCallback[];
}

export default function IdleManager({ callbacks }: IdleTouchLayerProps) {
  const timers = useRef<(ReturnType<typeof setTimeout> | null)[]>([]);

  const clearAllTimers = useCallback(() => {
    timers.current.forEach((t) => t && clearTimeout(t));
    timers.current = [];
  }, []);

  const resetIdleTimers = useCallback(() => {
    clearAllTimers();

    timers.current = callbacks.map(({ cb, timeout }) =>
      setTimeout(() => {
        try {
          cb();
        } catch (err) {
          console.warn("Erro em callback de idle:", err);
        }
      }, timeout)
    );
  }, [callbacks, clearAllTimers]);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => resetIdleTimers(),
      onPanResponderMove: () => resetIdleTimers(),
      onPanResponderRelease: () => resetIdleTimers(),
    })
  ).current;

  useEffect(() => {
    resetIdleTimers();

    const sub = AppState.addEventListener("change", (next: AppStateStatus) => {
      if (next === "active") resetIdleTimers();
      else clearAllTimers();
    });

    return () => {
      sub.remove();
      clearAllTimers();
    };
  }, [resetIdleTimers, clearAllTimers]);

  return (
    <View
      {...panResponder.panHandlers}
      style={styles.overlay}
      pointerEvents="auto"
    />
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 9999,
    backgroundColor: "transparent",
  },
});
