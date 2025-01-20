/** @type {import('next').NextConfig} */
const { NextFederationPlugin } = require("@module-federation/nextjs-mf");
const remotes = (isServer) => {
  const location = isServer ? "ssr" : "chunks";
  return {
    auth: `auth@${process.env.NEXT_PUBLIC_REMOTE_AUTH_URL}/_next/static/${location}/remoteEntry.js`,
    profile: `profile@${process.env.NEXT_PUBLIC_REMOTE_PROFILE_URL}/_next/static/${location}/remoteEntry.js`,
    userPreferences: `userPreferences@${process.env.NEXT_PUBLIC_REMOTE_USER_PREFERENCES_URL}/_next/static/${location}/remoteEntry.js`,
    products: `products@${process.env.NEXT_PUBLIC_REMOTE_PRODUCTS_URL}/_next/static/${location}/remoteEntry.js`,
    cart: `cart@${process.env.NEXT_PUBLIC_REMOTE_CART_URL}/_next/static/${location}/remoteEntry.js`,
    orders: `orders@${process.env.NEXT_PUBLIC_REMOTE_ORDERS_URL}/_next/static/${location}/remoteEntry.js`,
    payments: `payments@${process.env.NEXT_PUBLIC_REMOTE_PAYMENTS_URL}/_next/static/${location}/remoteEntry.js`,
  };
};

const nextConfig = {
  reactStrictMode: true,
  webpack(config, options) {
    config.plugins.push(
      new NextFederationPlugin({
        name: "host",
        filename: "static/chunks/remoteEntry.js",
        remotes: remotes(options.isServer),
        exposes: {
          "./Header": "./components/Header.tsx",
          "./Footer": "./components/Footer.tsx",
        },
        extraOptions: {
          exposePages: true,
          automaticAsyncBoundary: true,
        },
      })
    );
    return config;
  },
};

module.exports = nextConfig;
