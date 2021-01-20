module.exports = {
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.vue$": "vue-jest",
    "^.+\\js$": "babel-jest",
  },
  moduleFileExtensions: ["vue", "js", "json", "jsx", "ts", "tsx", "node"],
  testMatch: ["**/test/**/*.spec.js", "**/__tests__/**/*.spec.js"],
  moduleNameMapper: {
    "^main(.*)$": "<rootDir>/src$1",
  },
};
