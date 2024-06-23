export async function postDataOnFetch(endpoint, method, data, withImage) {
  console.log(`${import.meta.env.VITE_BACKEND_DOMAIN}${endpoint}`);
  try {
    const headers = withImage
      ? {
          "Content-Type": "application/json",
        }
      : null;

    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_DOMAIN}${endpoint}`,
      {
        mode: "cors",
        method,
        body: data,
        credentials: "include",
        headers: headers,
      }
    );
    console.log("checking response");
    console.log(response);
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
