export async function getDonors({ filter = "students", query, pageNo }) {
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
