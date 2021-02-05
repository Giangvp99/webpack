const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

// const VENDOR_LIBS = [];

module.exports = {
  mode: "development",
  entry: {
    bundle: path.resolve(__dirname, "src", "index.js"),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env", "@babel/preset-react"],
              plugins: ["@babel/plugin-transform-runtime"],
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "src", "assets", "index.html"),
    }),
    new MiniCssExtractPlugin({
      filename: "styles/styles.css",
    }),
    new CleanWebpackPlugin(),
  ],
  output: {
    path: path.resolve(__dirname, "../server/public"),
    filename: "js/[name].js",
  },
  optimization: {
    runtimeChunk: "single",
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: "all",
        },
      },
    },
  },
  devServer: {
    port: 9000,
    open: true,
    historyApiFallback: true,
    contentBase: "../server/public",
    publicPath: "/",
  },
  devtool: "eval",
};
