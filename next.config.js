/** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
// }


const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

module.exports = {
  compiler: {
    styledComponents: true,
  },
  images: {
    domains: ['res.cloudinary.com', 'lh3.googleusercontent.com'],
  }
}
