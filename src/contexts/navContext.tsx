import { createContext, ReactNode, useContext, useRef, useState, useEffect, useCallback, RefObject } from "react";
import { BackHandler } from "react-native";

type ScreenName =
  | "home"
  | "cart"
  | "scanner"
  | "checkout"
  | "admin"
  | "adminScanner"
  | "adminStats";

type ScreenNavMethod = (screen: ScreenName, args?: Record<string, string>) => void;

const NavContext = createContext<{
  activeScreen: ScreenName;
  goToScreen: ScreenNavMethod;
  OverrideActiveScreen: ScreenNavMethod;
  goBack: () => void;
  screenArgs: RefObject<Record<string, string>|null>;
} | null>(null);

export function NavContextProvider({ children }: { children: ReactNode }) {
  const [activeScreen, setActiveScreenState] = useState<ScreenName>("home");
  const lastScreen = useRef<ScreenName|null>(null);
  const screenArgs = useRef<Record<string, string>|null>(null);

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

  // Wrapper para setActiveScreenState que limpa o lastScreen e passa argumentos para a tela
  const OverrideActiveScreen = useCallback<ScreenNavMethod>((screenName, args) => {
    screenArgs.current = null;
    if (args) {
      screenArgs.current = args
    }
    
    setActiveScreenState(screenName);
    lastScreen.current = null;
  }, [])

  // Wrapper para setActiveScreenState que atualiza o lastScreen e passa argumentos para a tela
  const goToScreen = useCallback<ScreenNavMethod>((screenName, args) => {
    screenArgs.current = null;
    if (args) {
      screenArgs.current = args
    }

    lastScreen.current = activeScreen;
    setActiveScreenState(screenName);
  }, [])

  const goBack = useCallback(() => {
    screenArgs.current = null;

    const lastScreenUpdate = lastScreen.current?.toString();
    lastScreen.current = activeScreen;
    // @ts-expect-error
    lastScreenUpdate && setActiveScreenState(lastScreenUpdate);
  }, [])

  return (
    <NavContext.Provider value={{ activeScreen, goToScreen, goBack, OverrideActiveScreen, screenArgs }}>
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