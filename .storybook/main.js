// @see https://www.npmjs.com/package/webpack-merge
const { merge } = require("webpack-merge");
// @see https://storybook.js.org/docs/vue/configure/webpack#extending-storybooks-webpack-config
const vueWebpackConfig = require("@vue/cli-service/webpack.config");

module.exports = {
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions"
  ],
  "framework": "@storybook/vue3",
  "core": {
    "builder": "@storybook/builder-webpack5"
  },
  webpackFinal: async (config) => {
    // Extract and merge only webpack.config.resolve.alias.@ of Vue.js
    let alias = config.resolve.alias;

    // Only do if there is an "alias" and no "@"
    if (alias && !alias["@"]) {
      alias = merge(alias, {
        "@": vueWebpackConfig.resolve.alias["@"],
      });
      config.resolve.alias = alias;
    }

    // Return the altered config
    return config;
  },  
}