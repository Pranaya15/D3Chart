const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
  devtool: "cheap-module-source-map",
  entry: "./index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    publicPath: "/dist",
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.(scss|sass|css)$/,
        use: [
          { loader: "style-loader" },

          {
            loader: "css-loader",
            options: {
              modules: true,
            },
          },
          { loader: "sass-loader" },
        ],
      },
    ],
  },
  plugins: [],
};
