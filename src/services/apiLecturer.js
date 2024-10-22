export async function getLecturers(query = "", pageNo = 0) {
  const params = {
    query: query ?? "",
    pageNo,
  };
  const queryString = "?" + new URLSearchParams(params).toString();
  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/lecturer/getAll${queryString}`,
  );
  const data = await res.json();
  return data;
}
