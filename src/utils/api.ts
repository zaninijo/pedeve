import { API_ADDRESS } from "../../app.config";

export const apiEndpoints: {[endpointName: string]: string[]} = {
    productFetch: [""]
}

const apiAddress = new URL(API_ADDRESS);

export async function apiFetch(paths: string[], options: RequestInit, includeAuth: boolean) {
    const fetchUrl = new URL(apiAddress);

    apiAddress.pathname = paths.map(p => encodeURIComponent(p)).join('/');

    const response = await fetch(fetchUrl, options)

    if (!response.ok) {
        const error = await response.text();
        throw new Error(`HTTP ${response.status}: ${error}`);
    }

    const data = await response.json()
    
    return data;
}