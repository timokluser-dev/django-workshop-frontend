module.exports = {
  devServer: {
    // local api proxy
    proxy: {
      '^/graphql': {
        target: 'http://django.what-ever.lo/',
        changeOrigin: true,
      },
    },
    // dev cors
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
  chainWebpack: config => {
    // GraphQL Loader
    config.module
      .rule('graphql')
      .test(/\.graphql$/)
      .use('graphql-tag/loader')
      .loader('graphql-tag/loader')
      .end();
  },
};
