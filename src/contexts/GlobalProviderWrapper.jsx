import { NavContextProvider } from "./navContext";
import { CartContextProvider } from "./cartContext";
import { ProductDataProvider } from "./productContext";

export default function GlobalProviderWrapper({ children }) {
  return (
    <NavContextProvider>
      <ProductDataProvider>
        <CartContextProvider>
          {children}
        </CartContextProvider>
      </ProductDataProvider>
    </NavContextProvider>
  );
}