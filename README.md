# Nuxt Minimal Starter

Look at the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
# Fabric.js Canvas Studio (Nuxt 4 + Vuetify 4)

- **Live Deployed URL:** https://YOUR-APP-NAME.vercel.app
- **Selected Third-Party Library:** `fabric` (Fabric.js Interactive Canvas Editor)

## Features
1. **Google Authentication (`/login`)**: Client-side Google Identity Services OAuth integration with error handling and redirect.
2. **Protected Dashboard (`/`)**: Route middleware protection displaying the authenticated user's Google profile photo, full name, and email.
3. **Interactive Canvas Editor (`/canvas-editor`)**: Add rectangles, circles, triangles, and editable text; drag, resize, rotate, recolor, delete, and export the canvas as a PNG image.