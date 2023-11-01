// @ts-check

/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation.
 * This is especially useful for Docker builds.
 */
!process.env.SKIP_ENV_VALIDATION && (await import("./src/env.mjs"));

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,
  i18n: { locales: ["en"], defaultLocale: "en" },
  images: {
    domains: ["lh3.googleusercontent.com", "utfs.io", "loremflickr.com"],
    formats: ["image/avif", "image/webp"],
  },
  poweredByHeader: false,
  generateEtags: false,
  swcMinify: true,
  trailingSlash: true,
  cleanDistDir: true,
};

export default config;
