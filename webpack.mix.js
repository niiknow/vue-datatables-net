const webpack      = require('webpack');
const path         = require('path');
const mix          = require('laravel-mix');
const pkg          = require('./package.json');
const public       = process.env.NODE_ENV === 'dist' ? 'dist' : 'example';
const ESLintPlugin = require('eslint-webpack-plugin');

const banner  = `${pkg.name}
${pkg.description}\n
@version v${pkg.version}
@author ${pkg.author}
@repository ${pkg.repository.url}`;

mix.setPublicPath(path.normalize(public));

const config = {
  externals: {
    'jquery': 'jQuery',
    'vue': 'Vue'
  },
  module: {
    rules: []
  },
  output: {
    path: path.resolve(public),
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
  devtool: 'cheap-source-map',
  plugins: [
    new webpack.ProvidePlugin({
      Promise: 'es6-promise'
    }),
    new ESLintPlugin(),
    new webpack.BannerPlugin(banner)
  ]
};

mix.webpackConfig(config).sourceMaps();
mix.version();

if (process.env.NODE_ENV === 'dist') {
  mix.js(`src/index.js`, `${ public }`).vue();
  mix.disableNotifications();
} else {
  const exampleName = process.env.EXAMPLE || 'app'

  mix.js(`example/${exampleName}.js`, `${ public }`).vue();
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
}

