/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['pbs.twimg.com','abs.twimg.com', 'cdn.discordapp.com', 'cdn.sstatic.net', 'assets.coingecko.com', "lh3.googleusercontent.com", 'storage.opensea.io', 'pbs.twimg.com', 'storage.googleapis.com', 'img.youtube.com', "avatars.dicebear.com", "www.arweave.net"],
  },
}

module.exports = nextConfig
