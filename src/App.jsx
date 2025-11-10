import React, { createContext, useContext, useEffect, useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as NavigationBar from 'expo-navigation-bar';
import { useNavContext } from './contexts/NavContext';
import { useKeepAwake } from 'expo-keep-awake';
import IdleManager from './components/IdleManager';
import CheckoutScreen from './screens/CheckoutScreen';
import ScannerScreen from './screens/ScannerScreen';

import HomeScreen from './screens/HomeScreen';
import CartScreen from './screens/CartScreen'
import { INACTIVITY_TRIGGER, INACTIVITY_WARNING } from '../app.config';
import { useAuth } from './contexts/AuthContext';
import { View } from 'react-native';
import useModal from './hooks/useModal';

export default function App({children}) {
  useKeepAwake();

  useEffect(() => {
    // Modo tela cheia (esconde a UI do dispositivo)
    NavigationBar.setVisibilityAsync('hidden');
    NavigationBar.setBehaviorAsync('overlay-swipe');
  }, []);

  const { activeScreen, OverrideActiveScreen  } = useNavContext();
  const { authToken } = useAuth()
  const { modal } = useModal();

  if (!authToken) {
    return <View>
      {/* TODO: tela de login */}
    </View>
  }

  return (
    <SafeAreaProvider>

      {modal /* Overlay de modal, a princípio inativo. */}

      {/* Router básico de telas */}
      {(activeScreen == "home" || !activeScreen) && <HomeScreen /> }
      {activeScreen == "scanner" && <ScannerScreen /> }
      {activeScreen == "cart" && <CartScreen /> }
      {activeScreen == "checkout" && <CheckoutScreen /> }
      
      {activeScreen == "admin" && <HomeScreen /> }
      {activeScreen == "adminScanner" && <HomeScreen /> }
      
      <IdleManager callbacks={
        [
          {
            cb: () => {
              OverrideActiveScreen("home");
            },
            timeout: INACTIVITY_TRIGGER
          },
          {
            cb: () => {
              // TODO: Criar alerta de inatividade
            },
            timeout: INACTIVITY_WARNING
          }
        ]
      } />

    </SafeAreaProvider>
  );
}
