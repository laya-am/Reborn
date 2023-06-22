/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = nextConfig
module.exports = {
  compiler: {
    styledComponents: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'media.licdn.com',
        port: '',
        pathname: 'dms/image/D4E03AQHxkLQuyZ3XrQ/profile-displayphoto-shrink_800_800/0/1677600855436?e=2147483647&v=beta&t=A5jNOs14oiNeM1HSr0hGLLUvnwkLclw7q4HzdmuX0uc',
      },
    ],
  },
}
