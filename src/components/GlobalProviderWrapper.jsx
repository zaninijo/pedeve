import { NavContextProvider } from "../contexts/NavContext";
import { CartContextProvider } from "../contexts/CartContext";
import { ProductProvider } from "../contexts/ProductContext";
import { AuthProvider } from "../contexts/AuthContext";
import { ModalProvider } from "../hooks/useModal";

export default function GlobalProviderWrapper({ children }) {
  return (
    <AuthProvider>
      <NavContextProvider>
        <ProductProvider>
          <CartContextProvider>
            <ModalProvider>
              {children}
            </ModalProvider>
          </CartContextProvider>
        </ProductProvider>
      </NavContextProvider>
    </AuthProvider>
  );
}