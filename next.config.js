/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = {
  compiler: {
    styledComponents: true,
  },
  images: {
    domains: ['res.cloudinary.com', 'lh3.googleusercontent.com'],
  }
}
