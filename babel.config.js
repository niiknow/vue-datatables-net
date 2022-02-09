module.exports = {
  "plugins": [
    ["@babel/plugin-transform-runtime", {
      "corejs": false
    }]
  ],
  "presets": [
    ["@babel/preset-env", {
      "modules": "commonjs",
      "useBuiltIns": "usage",
      "corejs": 3,
      "targets": "> 1%, last 2 versions, ie >= 11",
      "debug": false
    }]
  ]
}
