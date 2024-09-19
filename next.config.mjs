/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

export default nextConfig;

// /** for browser|Chrome conflicts? */
// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: false,
//   webpackDevMiddleware: (config) => {
//     config.watchOptions = {
//       poll: 1000, // Check for changes every 1000 milliseconds
//       aggregateTimeout: 300, // Delay the rebuild after the first change
//     };
//     return config;
//   },
// };

// // Use ES module export syntax
// export default nextConfig;
