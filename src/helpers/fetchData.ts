export async function postDataOnFetch(endpoint, method, data) {
  console.log(`${import.meta.env.VITE_BACKEND_DOMAIN}${endpoint}`);
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
}

export async function getDataFromFetch(endpoint) {
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
}
