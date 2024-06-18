export async function fetchData(endpoint, method, data) {
  console.log(`${import.meta.env.VITE_BACKEND_DOMAIN}${endpoint}`);
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
}
