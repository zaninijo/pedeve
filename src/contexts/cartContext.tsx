import {
  createContext,
  useRef,
  ReactNode,
  RefObject,
  useContext,
  useCallback,
  useSyncExternalStore,
} from "react";
import { Alert } from "react-native";
import { useProductsData, ListedProduct } from "./ProductContext";

export interface CartItem extends ListedProduct {
  quantity: number;
}

export interface CartInfo {
  totalItems: number;
  totalProducts: number;
  totalPrice: number;
  isEmpty: boolean;
}

type CartContextType = {
  cart: RefObject<CartItem[]>;
  subscribe: (listener: () => void) => () => void;
  getSnapshot: () => CartItem[];
  addCartProduct: (barcode: number, quantity?: number) => void;
  updateCartProduct: (barcode: number, data: CartItem) => void;
  flushCart: () => void;
  getCartInfo: () => CartInfo;
};

const CartContext = createContext<CartContextType | null>(null);

export function CartContextProvider({ children }: { children: ReactNode }) {
  const { productsData } = useProductsData();

  const cart = useRef<CartItem[]>([]);
  const subscribers = useRef(new Set<() => void>());

  // Armazena o snapshot memoizado
  const snapshotRef = useRef<CartItem[]>(cart.current.slice());

  const subscribe = useCallback((listener: () => void) => {
    subscribers.current.add(listener);
    return () => subscribers.current.delete(listener);
  }, []);

  const notifyAll = useCallback((prev: CartItem[]) => {
    const next = cart.current;
    if (!areArraysEqual(prev, next)) {
      for (const listener of Array.from(subscribers.current)) listener();
    }
  }, []);

  // getSnapshot memoizado: só retorna um novo array se algo mudou
  const getSnapshot = useCallback(() => {
    if (!areArraysEqual(snapshotRef.current, cart.current)) {
      snapshotRef.current = cart.current.slice();
    }
    return snapshotRef.current;
  }, []);

  const addCartProduct = useCallback(
    (barcode: number) => {
      const product = productsData!.find((p) => p.barcode === barcode);
      if (!product) {
        Alert.alert(
          "Houve um problema",
          "Um ou mais produtos escaneados não foram encontrados em nosso sistema..."
        );
        return;
      }

      const prev = cart.current.slice();
      const idx = cart.current.findIndex((p) => p.barcode === barcode);

      if (idx === -1) {
        cart.current.push({ ...product, quantity: 1 });
      } else {
        cart.current[idx] = {
          ...cart.current[idx],
          quantity: cart.current[idx].quantity + 1,
        };
      }

      notifyAll(prev);
    },
    [productsData, notifyAll]
  );

  const updateCartProduct = useCallback(
    (barcode: number, data: CartItem) => {
      const prev = cart.current.slice();
      const idx = cart.current.findIndex((p) => p.barcode === barcode);
      if (idx === -1) return;
      if (data.quantity <= 0) {
        cart.current.splice(idx, 1);
      } else {
        cart.current[idx] = { ...cart.current[idx], ...data };
      }
      notifyAll(prev);
    },
    [notifyAll]
  );

  const flushCart = useCallback(() => {
    const prev = cart.current.slice();
    if (cart.current.length > 0) {
      cart.current = [];
      notifyAll(prev);
    }
  }, [notifyAll]);

  const getCartInfo = useCallback((): CartInfo => {
    const items = cart.current;
    const totalItems = items.reduce((acc, p) => acc + p.quantity, 0);
    const totalProducts = items.length;
    const totalPrice = items.reduce((acc, p) => acc + p.price * p.quantity, 0);

    return {
      totalItems,
      totalProducts,
      totalPrice,
      isEmpty: totalProducts === 0,
    };
  }, []);

  return (
    <CartContext.Provider
      value={{
        cart,
        subscribe,
        getSnapshot,
        addCartProduct,
        updateCartProduct,
        flushCart,
        getCartInfo,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

function areArraysEqual(a: CartItem[], b: CartItem[]) {
  if (a === b) return true;
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; i++) {
    if (a[i].barcode !== b[i].barcode || a[i].quantity !== b[i].quantity) {
      return false;
    }
  }
  return true;
}

export function useCartContext() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error(
      "useCartContext deve ser usado dentro de <CartContextProvider>"
    );
  }
  return ctx;
}

export function useCart() {
  const {
    subscribe,
    getSnapshot,
    addCartProduct,
    updateCartProduct,
    flushCart,
    getCartInfo,
  } = useCartContext();

  const cart = useSyncExternalStore(subscribe, getSnapshot, getSnapshot);

  return {
    cart,
    addCartProduct,
    updateCartProduct,
    flushCart,
    getCartInfo,
  };
}
