module.exports = {
  globals: {
    'ts-jest': {
      babelConfig: true
    }
  },
  moduleFileExtensions: [
    'js',
    'jsx',
    'json',
    'vue',
    'ts',
    'tsx'
  ],
  moduleNameMapper: {
    '^~src/(.*)$': '<rootDir>/src/$1'
  },
  preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',
  snapshotSerializers: [
    'jest-serializer-vue'
  ],
  testEnvironment: 'jsdom',
  testMatch: [
    '**/tests/jsunit/**/*.spec.(js|jsx|ts|tsx)|**/__tests__/*.(js|jsx|ts|tsx)'
  ],
  testURL: 'http://localhost/',
  transform: {
    '^.+\\.vue$': '@vue/vue3-jest',
    '.+\\.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)$': 'jest-transform-stub',
    '^.+\\.tsx?$': 'ts-jest',
    '^.+\\.(js|jsx)$': 'babel-jest'
  },
  transformIgnorePatterns: [
    '/node_modules/'
  ],
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname'
  ]
}
