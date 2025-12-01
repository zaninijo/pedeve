import React, {
  createContext,
  useCallback,
  ReactNode,
  useContext,
  useState,
} from "react";
import {
  useQuery,
  UseQueryResult,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { apiFetch } from "../utils/api";

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
  const text = await response.text();
  return JSON.parse(text);
}

export function ProductProvider({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <InnerProductProvider>{children}</InnerProductProvider>
    </QueryClientProvider>
  );
}

function InnerProductProvider({ children }: { children: ReactNode }) {
  const { data, isLoading, error, refetch }: UseQueryResult<ListedProduct[]> =
    useQuery({
      queryKey: ["products"],
      queryFn: fetchProducts,
      staleTime: Infinity,
    });

  const updateProductList = useCallback(() => {
    refetch();
  }, [refetch]);

  return (
    <ProductContext.Provider
      value={{
        productsData: data,
        isLoading,
        error,
        updateProductList,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export function useProductsData() {
  const ctx = useContext(ProductContext);
  if (!ctx) {
    throw new Error("useProductsData deve ser usado dentro de <ProductProvider>");
  }
  return ctx;
}
