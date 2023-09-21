// Pages/api/auth/[auth0].js
import { handleAuth, handleLogin } from "@auth0/nextjs-auth0";

export const GET = handleAuth({
  signup: handleLogin({ authorizationParams: { screen_hint: "signup" } }),
});
