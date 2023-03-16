module.exports = {
  webpack: function(config, { isServer }) {
    if (!isServer) {
      const babelRule = config.module.rules.find(rule => rule.use && rule.use.loader === 'babel-loader')
      if (babelRule) {
        babelRule.use.loader = '@swc/loader'
      }
    }
    if (isServer) {
      config.module.rules.push({
        test: /\.tsx?$/,
        use: {
          loader: '@swc/loader',
          options: {
            swcrc: './.swcrc',
            env: {
              targets: {
                node: 'current',
              },
            },
          },
        },
      })
    }
    config.module.rules.push({
      test: /\.md$/,
      use: 'raw-loader',
    })
    return config
  },
}