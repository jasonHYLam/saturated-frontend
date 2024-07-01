type HttpMethods = "POST" | "PUT" | "DELETE";
export async function fetchWithQuery(
  endpoint: string,
  method: HttpMethods,
  data: any,
  query: { [key: string]: string }
) {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_DOMAIN}${endpoint}?${new URLSearchParams(
        query
      ).toString()}`,
      {
        method: method,
        body: data,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response;
  } catch (err) {
    if (err) return err;
  }
}

export async function fetchWithoutQueryOrImage(
  endpoint: string,
  method: HttpMethods,
  data: any
) {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_DOMAIN}${endpoint}`,
      {
        mode: "cors",
        method,
        body: data,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response;
  } catch (err) {
    if (err) return err;
  }
}

export async function postDataOnFetchWithImage(
  endpoint: string,
  method: HttpMethods,
  data: any
) {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_DOMAIN}${endpoint}`,
      {
        mode: "cors",
        method: method,
        body: data,
        credentials: "include",
      }
    );
    return response;
  } catch (err) {
    if (err) return err;
  }
}

export async function getDataFromFetch(endpoint: string) {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_DOMAIN}${endpoint}`,
      {
        mode: "cors",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response;
  } catch (err) {
    if (err) return err;
  }
}
