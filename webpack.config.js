const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
  devtool: "cheap-module-source-map",
  entry: "./index.js", // tell webpack where to start
  output: {
    // we need to tell where to finish or what to produce

    path: path.resolve(__dirname, "dist"), // from where to start
    filename: "bundle.js",
    publicPath: "/dist", // web dev server doesnt recogonise path we need to add another variable called publlic path
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
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
          },
        ],
      },
    ],
  },
  plugins: [],
};
