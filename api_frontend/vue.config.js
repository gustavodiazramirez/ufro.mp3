const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  publicPath: process.env.NODE_ENV === 'production'
    ? 'http://localhost:8080/'  : '/',
  transpileDependencies: true
});
