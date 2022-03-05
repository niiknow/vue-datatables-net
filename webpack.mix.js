const fs           = require('fs')
const path         = require('path')
const mix          = require('laravel-mix')
const webpack      = require('webpack')
const pkg          = require('./package.json');
const deployTo     = 'example';
const ESLintPlugin = require('eslint-webpack-plugin');

const banner  = `${pkg.name}
${pkg.description}\n
@version v${pkg.version}
@author ${pkg.author}
@repository ${pkg.repository.url}`;

mix.setPublicPath(path.normalize(deployTo));

const config = {
  externals: {
    'jquery': 'jQuery',
    'vue': 'Vue'
  },
  module: {
    rules: []
  },
  output: {
    path: path.resolve(deployTo),
    filename: 'index.js',
    library: 'VdtnetTable',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  devServer: {
    overlay: true,
    inline: true,
    quiet: false
  },
  resolve: {
    extensions: ['.js', '.json', '.vue', '.sass', '.scss', '.ts'],
    alias: {
      '@src': path.resolve(__dirname, 'src'),
      'vue$': 'vue/dist/vue.esm.js'
    }
  },
  devtool: 'cheap-source-map',
  plugins: [
    new ESLintPlugin(),
    new webpack.BannerPlugin(banner)
  ]
};

mix.webpackConfig(config).sourceMaps();
mix.version();

const exampleName = process.env.EXAMPLE || 'example'

mix.ts(`example/${exampleName}.ts`, `${ deployTo }`).vue({
  version: 3,
  extractStyles: false
});
mix.browserSync({
  proxy: false,
  port: 3000,
  files: [
    'src/*',
    'example/*'
  ],
  browser: 'firefox',
  open: 'local',
  server: {
    baseDir: './'
  }
});


