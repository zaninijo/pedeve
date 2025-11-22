import { NavContextProvider } from "../contexts/NavContext";
import { CartContextProvider } from "../contexts/CartContext";
import { ProductProvider } from "../contexts/ProductContext";
import { AuthProvider } from "../contexts/AuthContext";

export default function GlobalProviderWrapper({ children }) {
  return (
    <AuthProvider>
      <NavContextProvider>
        <ProductProvider>
          <CartContextProvider>
            {children}
          </CartContextProvider>
        </ProductProvider>
      </NavContextProvider>
    </AuthProvider>
  );
}