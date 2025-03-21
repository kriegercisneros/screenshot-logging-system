/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    // You can expose public environment variables here if needed
  },
  // Increase API timeout for long-running operations
  serverRuntimeConfig: {
    // Will only be available on the server side
  },
  publicRuntimeConfig: {
    // Will be available on both server and client
  },
  // Optional: Optimize builds by excluding specific packages
  transpilePackages: [],
};

module.exports = nextConfig;