const fetchWithAuthorization = async (
  url: string | URL | Request,
  options: RequestInit
) => {
  // TODO: fix that
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjM5MTk5OTY5LTliMmMtNDc2Zi05NDE2LTNkNGZhNzc4ZTQxYSIsImVtYWlsIjoic3RyaW5nIiwiaWF0IjoxNzMzNTE0Njk1LCJleHAiOjE3NjUwNzIyOTV9.Rlk5mmwp39m0wbpplrKShUzJTUvfl033_0sphSEPlKE";

  if (!token) {
    throw new Error("Token not found in localStorage");
  }

  const headers = {
    ...options.headers,
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  const response = await fetch(url, { ...options, headers });

  return response;
};

const authenticatedFetch = async (
  url: string | URL | Request,
  options: RequestInit
) => {
  try {
    const response = await fetchWithAuthorization(url, options);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    return response.json();
  } catch (error) {
    console.error("Error during fetch:", error);
    throw error;
  }
};

export const fetcher = (url: string | URL | Request) =>
  authenticatedFetch(url, {
    method: "GET",
  });
