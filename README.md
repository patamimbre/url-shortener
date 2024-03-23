# 🔗 URL Shortener 🔗
A simple URL shortener using Next.js, Tailwind CSS, and Redis.

![url-shortener-screenshot](https://github.com/patamimbre/url-shortener/assets/9404632/be58dd59-07a0-43b2-a8ca-5f47da507230)

## Features
- 🔗 Input a URL and get a shortened URL
- 🙋‍♀️ Use a "human-readable" slug for the shortened URL
- 🔁 Redirect to the original URL using the shortened URL
- 📱 Generate a QR code for the URL

## Usage
You can try it online at [https://short-ener.vercel.app](https://short-ener.vercel.app)

## Installation
1. Clone the repository
2. Install dependencies (`npm install` or `yarn install` or `pnpm install`)
3. Setup a [Vercel KV storage](https://vercel.com/docs/storage/vercel-kv/quickstart) and download the `.env` file
4. Set the `VERCEL_URL` and KV_NAMESPACE_ID in the `.env` file (`https://localhost:3000` for local development)
5. Start the development server (`npm run dev` or `yarn dev` or `pnpm dev`)
