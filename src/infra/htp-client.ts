import { setCookie } from "nookies";

interface ExtendedRequestInit extends RequestInit {
  refresh?: boolean;
}
export interface HttpResponse<T> {
  ok: boolean;
  status: number;
  statusText: string;
  body: T;
}

export async function HttpClient<T>(
  fetchUrl: string,
  fetchOptions: ExtendedRequestInit,
): Promise<HttpResponse<T>> {
  const options: RequestInit = {
    ...fetchOptions,
    headers: {
      ...fetchOptions.headers,
    },
    body: fetchOptions.body ? fetchOptions.body : null,
    credentials: "include",
  };

  try {
    const resServer: Response = await fetch(fetchUrl, options);

    const responseBody: T = (await resServer.json()) as T;

    const res: HttpResponse<T> = {
      ok: resServer.ok,
      status: resServer.status,
      statusText: resServer.statusText,
      body: responseBody,
    };

    if (!fetchOptions.refresh) {
      return res;
    }

    if (res.status !== 401) {
      return res;
    }

    try {
      const refreshResponse = await HttpClient<{
        access_token: string;
        refresh_token: string;
      }>(`${process.env.NEXT_PUBLIC_URL_API_BACKEND}/auth/refresh-token`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!refreshResponse.ok) {
        throw new Error("Token invalid");
      }

      const newAccessToken = refreshResponse.body.access_token;

      console.log(refreshResponse, newAccessToken);
      setCookie(null, "ACCESS_TOKEN", newAccessToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        path: "/",
      });

      const retryResponse: HttpResponse<T> = await HttpClient<T>(fetchUrl, {
        ...options,
        refresh: false,
        headers: {
          ...fetchOptions.headers,
          Authorization: `Bearer ${newAccessToken}`,
        },
      });

      return retryResponse;
    } catch (err) {
      console.error(err);
      throw new Error("Failed to refresh token");
    }
  } catch (error) {
    throw new Error("Failed to fetch: " + (error as Error).message);
  }
}
