import { safeRead, tokenStoreKey } from "../contexts/AuthContext";
import expoEnv from "../expoEnv";

export const apiEndpoints: {[endpointName: string]: string[]} = {
    productFetch: [""]
}

const { API_ADDRESS } = expoEnv;

const apiAddress = new URL(API_ADDRESS);

export async function apiFetch(paths: string[], options: RequestInit, includeAuth: boolean) {
    const authToken = await safeRead(tokenStoreKey);
    const fetchUrl = new URL(apiAddress);
    apiAddress.pathname = paths.map(p => encodeURIComponent(p)).join('/');
    
    const headers = new Headers(options.headers || {});
    if (includeAuth && authToken) {
        headers.set('Authorization', `Bearer ${authToken}`);
    }

    const requestOptions = { ...options, headers }
    const response = await fetch(fetchUrl, requestOptions);
    
    return response;
}