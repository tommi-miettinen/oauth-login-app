import { handleAuth, handleLogin } from "@auth0/nextjs-auth0";

export default handleAuth({
  async login(req, res) {
    await handleLogin(req, res, {
      authorizationParams: {
        scope:
          "openid email phone address profile https://oneportal.trivore.com/scope/profile.update",
      },
    });
  },
});
