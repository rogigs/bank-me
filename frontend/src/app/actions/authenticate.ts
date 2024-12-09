"use server";
import { FetchOptions } from "@/types/fetchOptions";

export const authenticate = async ({ url, options }: FetchOptions) => {
  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      return new Error("Network response was not ok");
    }

    return response.json();
  } catch (error) {
    console.error("Error during fetch:", error);
    return error;
  }
};
