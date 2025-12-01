import { safeRead, tokenStoreKey } from "../contexts/AuthContext";
import expoEnv from "../expoEnv";
import fakeProductDb from "./fakeProductDb";

type endpointDef = {[endpointName: string]: string[]}

export const apiEndpoints: endpointDef = {
    productFetch: [""]
}

const { API_ADDRESS, FAKE_API } = expoEnv;

const apiAddress = new URL(API_ADDRESS);

export async function apiFetch(
  path: string[],
  options: RequestInit = {},
  includeAuth: boolean,
  timeoutMs: number = 8000
) {
  const authToken = await safeRead(tokenStoreKey);

  const fetchUrl = new URL(apiAddress);
  fetchUrl.pathname = path.map(p => encodeURIComponent(p)).join("/");
  
  const headers = new Headers(options.headers || {});
  if (includeAuth && authToken) {
    headers.set("Authorization", `Bearer ${authToken}`);
  }
  
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
  
  if (FAKE_API) {
    const data = fakeApi(path, options.body, headers);
    return data;
  }

  try {
    const response = await fetch(fetchUrl.toString(), {
      ...options,
      headers,
      signal: controller.signal
    });

    clearTimeout(timeoutId);
    return response;

  } catch (error: any) {
    clearTimeout(timeoutId);

    if (error.name === "AbortError") {
      throw new Error("Tempo limite excedido na requisição");
    }

    throw error;
  }
}


// Simula API para testes
function fakeApi(path: string[], body: BodyInit | any, headers: HeadersInit | any): Response {
  const endpoint = path.join("/");

  let data = null;
  if (body) {
    try {
      data = JSON.parse(body);
    } catch {}
  }

  switch (endpoint) {
    case "auth/login":
      if (data?.credential !== "default") {
        return new Response(JSON.stringify({ error: "invalid credential" }), {
          status: 400,
          headers: { "Content-Type": "application/json" }
        });
      }
      return new Response(JSON.stringify({ token: "default" }), {
        status: 200,
        headers: { "Content-Type": "application/json" }
      });

    case "products": {
      if (headers.get("Authorization") !== "Bearer default") {
        return new Response(JSON.stringify({ error: "unauthorized" }), {
          status: 401,
          headers: { "Content-Type": "application/json" }
        });
      }

      return new Response(JSON.stringify(fakeProductDb), {
        status: 200,
        headers: { "Content-Type": "application/json" }
      });
    }

    default:
      return new Response(JSON.stringify({ error: "not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" }
      });
  }
}
