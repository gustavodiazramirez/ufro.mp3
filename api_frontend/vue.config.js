const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  publicPath: process.env.NODE_ENV === 'production'
    ? 'https://6dfa-181-172-90-126.ngrok.io/'
    : '/',
  transpileDependencies: true
});
