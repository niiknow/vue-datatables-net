const VuePlugin = require('rollup-plugin-vue').default

module.exports = {
  banner: true,
  format: ['umd-min'],
  css: true,
  plugins: [
    VuePlugin({ css: true })
  ],
  outDir: 'lib'
}
