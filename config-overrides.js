const { override, adjustStyleLoaders } = require("customize-cra-5");
const path = require("path");

module.exports = override(
  (config, env) => {
    /*Change the entry point for production build config, hence you can have index.js for development and another file(say `build.js`) for production build */
    // config.entry = path.resolve(__dirname, "src/index.js");

    config.output = {
      ...config.output,
      // Change the JS output filename and path from  'static/js/[name].[contenthash:8].js' to your preferred name and path
      filename: `static/widget.js`,

      library: {
        name: "Widget",
        type: "umd",
        umdNamedDefine: true,
      },
    };

    /* Disable create-react-app from building index.html */
    // config.plugins = config.plugins.filter((plugin) => plugin.constructor.name !== "HtmlWebpackPlugin");

    //  Change the CSS output file name and path, from 'static/css/[name].[contenthash:8].css' to `static/${buildFileName}.css`
    // eslint-disable-next-line array-callback-return
    config.plugins.map((plugin, i) => {
      if (plugin.filename && plugin.filename.includes("static/css")) {
        config.plugins[i].filename = `static/widget.css`;
      }
    });

    config.optimization.splitChunks = {
      cacheGroups: { default: false },
    };
    config.optimization.runtimeChunk = false;

    return config;
  },
  /*Bundle css alongside js */
  adjustStyleLoaders(({ use }) => {
    use.forEach((loader) => {
      if (/mini-css-extract-plugin/.test(loader.loader)) {
        loader.loader = require.resolve("style-loader");
        loader.options = {};
      }
    });
  })
);
