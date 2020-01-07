const path   = require('path');
const mix    = require('laravel-mix');
const public = mix.inProduction() ? 'lib' : 'example';

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
    overlay: true,
    inline: true,
    quiet: false
  },
  devtool: 'cheap-source-map'
};

mix.webpackConfig(config).sourceMaps();

if (mix.inProduction()) {
  mix.js(`src/index.js`, `${ public }`);
  mix.version();
  mix.disableNotifications();
} else {
  const exampleName = process.env.EXAMPLE || 'app'

  mix.js(`example/${exampleName}.js`, `${ public }`);
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

