const { merge } = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa-react");

module.exports = (webpackConfigEnv, argv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: "GreenStore",
    projectName: "home",
    webpackConfigEnv,
    argv,
  });

  return merge(defaultConfig, {
    module: {
      // rules: [
      //   {
      //     test: /\.css$/,
      //     use: ["style-loader", "css-loader", "postcss-loader"],
      //   },
      // ],
    },
  });
};
