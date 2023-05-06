### Built with
- Nextjs
- TypeScript
- Tailwind

### Features
- Authentication
- Editing user profile

### Running locally
```
git clone https://github.com/tommi-miettinen/trivore-login.git
npm install
```

Add an .env.local file with your OIDC config.
```
# A long, secret value used to encrypt the session cookie
AUTH0_SECRET=""
# The base url of your application
AUTH0_BASE_URL=http://localhost:3000
# The url of your Auth0 tenant domain
AUTH0_ISSUER_BASE_URL=""
# Your Auth0 application's Client ID
AUTH0_CLIENT_ID=""
# Your Auth0 application's Client Secret
AUTH0_CLIENT_SECRET=""
```
```
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

![screenshot1](https://user-images.githubusercontent.com/63008431/236618764-f30e8e4e-2f5c-42f4-9ae7-3abec431ed82.png)
