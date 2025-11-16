import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from "react";
import { apiFetch } from "../utils/api";
import * as SecureStore from 'expo-secure-store'

export const tokenStoreKey = "auth_token"
export const passwordStoreKey = "auth_password"

export async function safeStore(key: string, value: string|null) {
  if (!value) {
    await SecureStore.deleteItemAsync(key);
    return;
  }
  await SecureStore.setItemAsync(key, value);
}

export async function safeRead(key: string) {
  return await SecureStore.getItemAsync(key);
}

const AuthContext = createContext<{
  authToken: string|null,
  passwordLogin: (credential: string) => Promise<{token: string, password: string}|null>,
  resetAuth: () => void,
}|null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [authToken, setAuthToken] = useState<string|null>(null);

  useEffect(() => {
    safeRead(tokenStoreKey).then((token) => {
      token && setAuthToken(token);
    });
  }, []);

  const passwordLogin = useCallback(
    async function (password: string): Promise<{token: string, password: string}|null> {
      // TODO: integrar com api
  
      const response = await apiFetch(["auth", "login"], {
        method: "POST",
        headers: {
  
        },
        body: JSON.stringify({
          credential: password
        })
      }, false);
  
      if (response.ok) {
        const data = await response.json();
        const token: string = data.token;

        safeStore(tokenStoreKey, token)
        setAuthToken(token);
        return {token, password}
      }
  
      return null
    }, [setAuthToken]);

    function resetAuth() {
      safeStore(tokenStoreKey, null)
    }

  return (
    <AuthContext.Provider value={{authToken, passwordLogin, resetAuth}}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useNavContext deve ser usado dentro de <AuthProvider>");
  }
  return ctx;
}