import { NavContextProvider } from "../contexts/NavContext";
import { CartContextProvider } from "../contexts/CartContext";
import { ProductDataProvider } from "../contexts/ProductContext";
import { AuthProvider } from "../contexts/AuthContext";

export default function GlobalProviderWrapper({ children }) {
  return (
    <AuthProvider>
      <NavContextProvider>
        <ProductDataProvider>
          <CartContextProvider>
            {children}
          </CartContextProvider>
        </ProductDataProvider>
      </NavContextProvider>
    </AuthProvider>
  );
}