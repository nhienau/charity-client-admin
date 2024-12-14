export async function getDonors({ filter = "all", query, pageNo }) {
  const params = {
    query: query ?? "",
    filter,
    pageNo,
  };
  const queryString = "?" + new URLSearchParams(params).toString();
  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/donor/getAll${queryString}`,
  );
  const data = await res.json();
  return data;
}

export async function createDonor(donor) {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/donor/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(donor),
    });
    const data = await res.json();
    return data;
  } catch (e) {
    throw new Error(e.message);
  }
}

export async function deleteDonor(id) {
  const params = {
    id,
  };
  const queryString = "?" + new URLSearchParams(params).toString();
  try {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/donor/delete${queryString}`,
      {
        method: "DELETE",
      },
    );
    const data = await res.json();
    return data;
  } catch (e) {
    throw new Error(e.message);
  }
}
