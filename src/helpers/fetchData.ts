export async function fetchData(endpoint) {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_DOMAIN}${endpoint}`,
    {
      mode: "cors",
    }
  );
}
