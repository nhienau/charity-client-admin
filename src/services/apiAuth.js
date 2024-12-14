import { parseJwt } from "@/utils/helpers";

export async function login(username, password) {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      password,
    }),
  });
  if (res.status === 401) {
    throw new Error("Login failed");
  }
  const data = await res.json();
  const { accessToken } = data;

  if (data.accessToken) {
    return parseJwt(accessToken);
  } else {
    throw new Error("Login failed");
  }
}

export async function getUserInfo() {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/info`, {
    credentials: "include",
  });
  const data = await res.json();
  if (data.status === 400) {
    return null;
  }
  return data;
}

export async function changePassword(currentPassword, newPassword) {
  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/auth/change-password`,
    {
      method: "POST",
      credentials: "include", // Bao gồm cookie (ví dụ: session)
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        currentPassword,
        newPassword,
      }),
    },
  );

  if (res.status === 401) {
    throw new Error("Mật khẩu hiện tại không đúng.");
  }

  if (!res.ok) {
    throw new Error("Đổi mật khẩu thất bại. Vui lòng thử lại.");
  }

  const data = await res.text();
  return data;
}

export async function logout() {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/logout`, {
    credentials: "include",
  });
  const data = await res.text();
  return data;
}
