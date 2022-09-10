// TODO: Make backend and insert url
const BASE_URL = "";
const RESOURSE_URL = `${BASE_URL}/good`;

// Base logic for request

const baseRequest = async ({ urlPath = "", method = "GET", body = null }) => {
  try {
    const reqParams = {
      method,
      headers: {
        "Content-Type": "application/json",
      },
    };

    if (body) {
      reqParams.body = JSON.stringify(body);
    }

    return await fetch(`${RESOURSE_URL}${urlPath}`, reqParams);
  } catch (error) {
    console.error("HTTP ERROR: ", error);
  }
};

// Public requests

export const getAllItems = async () => {
  const response = await baseRequest({ method: "GET" });

  return await response.json();
};

export const postItem = (body) => baseRequest({ method: "POST", body });

export const updateItem = (id, body) =>
  baseRequest({ urlPath: `/${id}`, method: "PUT", body });

export const deleteItem = (id) =>
  baseRequest({ urlPath: `/${id}`, method: "DELETE" });
