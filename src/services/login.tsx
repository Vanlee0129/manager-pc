import request from "@/utils/request";

export async function login(data: { username: string; password: string }) {
  return request('/auth/login', {
    method: 'POST',
    body: data,
  });
}

export async function logout() {
  return request('/auth/logout', {
    method: 'POST',
  });
}