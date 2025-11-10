import { API_ADDRESS } from "../../app.config";
import { safeRead, tokenStoreKey } from "../contexts/AuthContext";

export const apiEndpoints: {[endpointName: string]: string[]} = {
    productFetch: [""]
}

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