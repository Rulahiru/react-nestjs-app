import api from "./APIIntercepter";

async function loginAPI(params: any) {
  const res = await api.post("auth/login", params);
  return res.data;
}

async function getUserDetailsAPI() {
  const res = await api.get("auth/me");
  return res.data;
}

export { loginAPI, getUserDetailsAPI };
