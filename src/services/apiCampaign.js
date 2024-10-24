export async function getCampaigns(query = "", pageNo = 0) {
  const params = {
    query: query ?? "",
    pageNo,
  };
  const queryString = "?" + new URLSearchParams(params).toString();
  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/campaign/getAll${queryString}`,
  );
  const data = await res.json();
  return data;
}

export async function getCampaign(id) {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/campaign/get?id=${id}`,
    );
    const data = await res.json();
    return data;
  } catch (e) {
    return null;
  }
}

export async function addCampaignImages(images, campaignId) {
  try {
    const formData = new FormData();
    images.forEach((image) => {
      formData.append("files", image);
    });
    formData.append("campaignId", Number(campaignId));

    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/campaign/uploadImages`,
      {
        method: "POST",
        body: formData,
      },
    );
    const data = await res.json();
    return data;
  } catch (e) {
    return null;
  }
}

export async function deleteCampaignImages(imageIds) {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/campaign/deleteImages`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          imageIds,
        }),
      },
    );
    const data = await res.json();
    return data;
  } catch (e) {
    return null;
  }
}

export async function createCampaign(campaign) {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/campaign/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(campaign),
    });
    const data = await res.json();
    return data;
  } catch (e) {
    return null;
  }
}

export async function updateCampaign(campaign) {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/campaign/update`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(campaign),
    });
    const data = await res.json();
    return data;
  } catch (e) {
    throw new Error(e.message);
  }
}

export async function deleteCampaign(id) {
  const params = {
    id,
  };
  const queryString = "?" + new URLSearchParams(params).toString();
  try {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/campaign/delete${queryString}`,
      {
        method: "PUT",
      },
    );
    const data = await res.json();
    return data;
  } catch (e) {
    throw new Error(e.message);
  }
}
