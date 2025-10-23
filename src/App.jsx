import React, { createContext, useContext, useEffect, useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as NavigationBar from 'expo-navigation-bar';
import { useNavContext } from './contexts/navContext';
import { useKeepAwake } from 'expo-keep-awake';
import IdleManager from './components/IdleManager';
import { useCart } from './contexts/cartContext';

import HomeScreen from './screens/HomeScreen';
import CartScreen from './screens/CartScreen'
import { INACTIVITY_TRIGGER, INACTIVITY_WARNING } from '../app.config';

export default function App() {
  useKeepAwake();

  useEffect(() => {
    // Modo tela cheia (esconde a UI do dispositivo)
    NavigationBar.setVisibilityAsync('hidden');
    NavigationBar.setBehaviorAsync('overlay-swipe');
  }, []);

  const { flushCart } = useCart();
  const { activeScreen, OverrideActiveScreen  } = useNavContext();

  return (
    <SafeAreaProvider>

      {/* Router básico de telas */}
      {(activeScreen == "home" || !activeScreen) && <HomeScreen /> }
      {activeScreen == "scanner" && <HomeScreen /> }
      {activeScreen == "cart" && <CartScreen /> }
      {activeScreen == "checkout" && <HomeScreen /> }
      
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
