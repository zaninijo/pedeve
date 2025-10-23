import { createContext, ReactNode, useContext, useRef, useState, useEffect, useCallback } from "react";
import { BackHandler } from "react-native";

type ScreenName =
  | "home"
  | "cart"
  | "scanner"
  | "checkout"
  | "admin"
  | "adminScanner"
  | "adminStats";

const NavContext = createContext<{
  activeScreen: ScreenName;
  goToScreen: (value: ScreenName) => void;
  goBack: () => void;
  OverrideActiveScreen: (screen: ScreenName) => void;
} | null>(null);

export function NavContextProvider({ children }: { children: ReactNode }) {
  const [activeScreen, setActiveScreenState] = useState<ScreenName>("home");
  const lastScreen = useRef<ScreenName | null>(null);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        goBack();
        return true;
      }
    );

    return () => backHandler.remove();
  }, []);

  // Wrapper para setActiveScreenState que limpa o lastScreen
  const OverrideActiveScreen = useCallback((value: ScreenName) => {
    setActiveScreenState(value);
    lastScreen.current = null;
  }, [])

  // Wrapper para setActiveScreenState que atualiza o lastScreen
  const goToScreen = useCallback((screenName: ScreenName) => {
    lastScreen.current = activeScreen;
    setActiveScreenState(screenName)
  }, [])

  const goBack = useCallback(() => {
    const lastScreenUpdate = lastScreen.current?.toString();
    lastScreen.current = activeScreen;
    // @ts-expect-error
    lastScreenUpdate && setActiveScreenState(lastScreenUpdate);
  }, [])

  return (
    <NavContext.Provider value={{ activeScreen, goToScreen, goBack, OverrideActiveScreen }}>
      {children}
    </NavContext.Provider>
  );
}

export function useNavContext() {
  const ctx = useContext(NavContext);
  if (!ctx) {
    throw new Error("useNavContext deve ser usado dentro de <NavContextProvider>");
  }
  return ctx;
}