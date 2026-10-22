# EQUALIZE

A gender awareness and inclusion platform focused on gender-based violence and harassment, built around official Philippine data and law.

Built with [TanStack Start](https://tanstack.com/start), React, Vite and Tailwind CSS.

## Local development

```sh
bun install
bun run dev
```

## Build

```sh
bun run build
```

The build uses Nitro's `vercel` preset and writes the [Vercel Build Output](https://vercel.com/docs/build-output-api/v3) to `.vercel/output`.

## Deploy to Vercel

1. Import this GitHub repository in the [Vercel dashboard](https://vercel.com/new).
2. Keep the defaults — `vercel.json` already sets the install command (`bun install`) and build command (`bun run build`).
3. Deploy. Every push to `main` triggers a new production deployment.
