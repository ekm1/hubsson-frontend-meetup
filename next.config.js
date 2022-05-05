module.exports = {
  reactStrictMode: true,
  webpack(config, { isServer }) {
    config.output.webassemblyModuleFilename = isServer
      ? './../static/wasm/[modulehash].wasm'
      : 'static/wasm/[modulehash].wasm'
    config.experiments = { asyncWebAssembly: true }
    config.optimization.moduleIds = 'named'
    return config
  },
}
