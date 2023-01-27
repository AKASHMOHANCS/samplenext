/** @type {import('next').NextConfig} */




const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  env: {
    BASE_URL: "http://localhost:4000/",
    MY_SECRET_TOKEN: "ksUZY4lNm7e7",
    MAILCHIMP_API_KEY: "115b09d6340da52caf75210da4f40bcf-us13",
    MAILCHIMP_AUDIENCE_ID: "34da44543e",
    MAILCHIMP_API_SERVER: "us13",
  },


};

module.exports = nextConfig;
