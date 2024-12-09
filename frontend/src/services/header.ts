import { LOCAL_STORAGE_KEYS } from "@/constants/localStorage";

export const headersWithAuthorization = (headers?: HeadersInit) => ({
  headers: {
    ...headers,
    Authorization: `Bearer ${localStorage.getItem(LOCAL_STORAGE_KEYS.TOKEN)}`,
  },
});

export const fetchHeadersWithAuthorization = (
  fetch?: RequestInit
): RequestInit => ({
  ...fetch,
  ...headersWithAuthorization(fetch?.headers),
});
