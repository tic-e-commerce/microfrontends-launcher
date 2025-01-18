/** @type {import('next').NextConfig} */
const { NextFederationPlugin } = require("@module-federation/nextjs-mf");
const nextConfig = {
  reactStrictMode: true,
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: "*",
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET, POST, OPTIONS",
          },
          {
            key: "Access-Control-Allow-Headers",
            value: "Origin, X-Requested-With, Content-Type, Accept",
          },
        ],
      },
    ];
  },
  webpack(config, options) {
    config.plugins.push(
      new NextFederationPlugin({
        name: "auth",
        filename: "static/chunks/remoteEntry.js",
        remotes: {},
        exposes: {
          "./RegisterForm": "./components/RegisterForm.tsx",
          "./LoginForm": "./components/LoginForm.tsx",
          "./ForgotPasswordEmailForm":
            "./components/ForgotPasswordEmailForm.tsx",
          "./ForgotPasswordForm": "./components/ForgotPasswordForm.tsx",
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
