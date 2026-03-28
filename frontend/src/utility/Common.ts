export const storeTokens = async (accessToken: string) => {
  localStorage.setItem("token", accessToken);
};