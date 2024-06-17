export async function fetchData(endpoint, method) {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_DOMAIN}${endpoint}`,
    {
      mode: "cors",
      method,
    }
  );
}
