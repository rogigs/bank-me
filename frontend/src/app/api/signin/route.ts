import { cookies } from "next/headers";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    // TODO: Orval must separate swr and fetch
    const res = (await fetch(`http://localhost:4000/api/v1/integrations/auth`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })) as any;

    const data = await res.json();

    if (data?.accessToken) {
      const cookieStore = await cookies();
      cookieStore.set("TOKEN", data.accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        path: "/",
        maxAge: 60 * 60 * 24,
      });

      return new Response("Authentication successful", {
        status: 200,
      });
    }

    return new Response("Invalid credentials", {
      status: 401,
    });
  } catch (error) {
    console.error("Error in auth signin handler:", error);
    return new Response("Internal server error", {
      status: 500,
    });
  }
}
