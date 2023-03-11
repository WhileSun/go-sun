export default {
  dev: {
    '/api': {
      'target': 'http://127.0.0.1:3000/',
      'changeOrigin': true,
      'pathRewrite': {
        '^/api': 'api/'
      },
    },
    '/uploads': {
      'target': 'http://127.0.0.1:3000/',
      'changeOrigin': true,
      'pathRewrite': {
        '^/uploads': 'uploads/'
      },
    },
  },
  test: {
    '/api/': {
      target: 'https://preview.pro.ant.design',
      changeOrigin: true,
      pathRewrite: {
        '^': '',
      },
    },
  },
  pre: {
    '/api/': {
      target: 'your pre url',
      changeOrigin: true,
      pathRewrite: {
        '^': '',
      },
    },
  },
}