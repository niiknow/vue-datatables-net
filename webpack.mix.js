const path = require('path');
const mix = require('laravel-mix');
const source =  process.env.NODE_ENV === 'production' ? 'src' : 'example';
const public = process.env.NODE_ENV === 'production' ? 'lib' : 'dist';

mix.options({
  processCssUrls: false,
  uglify: {
    uglifyOptions: {
      compress: {
        drop_console: true
      }
    }
  }
});

mix.setPublicPath(path.normalize(public));

const config = {
  externals: {
    'jquery': 'jQuery',
    'vue': 'Vue'
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.(vue|js)$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'eslint-loader',
        options: {
          fix: false,
          cache: false,
          formatter: require('eslint-friendly-formatter')
        }
      }
    ]
  },
  output: {
    path: path.resolve(public),
    filename: 'index.js',
    library: 'VdtnetTable',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  devServer: {
    inline: true,
    quiet: false,
  },
  devtool: 'source-map'
};

mix.webpackConfig(config);
mix.js(`${ source }/index.js`, `${ public }`);
mix.sourceMaps();

if (mix.inProduction()) {
  mix.version();
  mix.disableNotifications();
}

