import {
  createContext,
  useCallback,
  ReactNode,
  useContext,
} from "react";
import { useQuery, UseQueryResult, QueryClientProvider, QueryClient} from "@tanstack/react-query";
import { apiFetch } from "../utils/api";

const queryClient = new QueryClient();

export interface ListedProduct {
  id: number;
  barcode: number;
  name: string;
  price: number;
  stock: number;
}

interface ProductDataContextType {
  productsData: ListedProduct[] | undefined;
  isLoading: boolean;
  error: unknown;
  updateProductList: () => void;
}

const ProductContext = createContext<ProductDataContextType | null>(null);

async function fetchProducts(): Promise<ListedProduct[]> {
  const response = await apiFetch(["products"], { method: "GET" }, true);
  const data = await response.json();
  return data;
}

export function ProductDataProvider({ children }: { children: ReactNode }) {
  const {
    data: products,
    isLoading,
    error,
    refetch,
  }: UseQueryResult<ListedProduct[]> = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
    staleTime: Infinity
  });

  const updateProductList = useCallback(() => {
    refetch();
  }, [refetch]);

  return (
    <QueryClientProvider client={queryClient} >
      <ProductContext.Provider
        value={{ productsData: products, isLoading, error, updateProductList }}
      >
        {children}
      </ProductContext.Provider>
    </QueryClientProvider>
  );
}

export function useProductsData() {
  const ctx = useContext(ProductContext);
  if (!ctx) throw new Error("useProducts deve ser usado dentro de <ProductProvider>");
  return ctx;
}
