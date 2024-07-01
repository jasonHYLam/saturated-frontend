export async function fetchWithQuery(endpoint, method, data, query) {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_DOMAIN}${endpoint}?${new URLSearchParams(
        query
      ).toString()}`,
      {
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

export async function fetchWithoutQueryOrImage(endpoint, method, data) {
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

export async function postDataOnFetchWithImage(endpoint, method, data) {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_DOMAIN}${endpoint}`,
      {
        mode: "cors",
        method,
        body: data,
        credentials: "include",
      }
    );
    return response;
  } catch (err) {
    if (err) return err;
  }
}

export async function getDataFromFetch(endpoint) {
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
