const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { webpack } = require("webpack");
const isProduction = process.env.NODE_ENV === "production";
const Dotenv = require("dotenv-webpack");

module.exports = {
  entry: "./src/index.tsx",
  mode: isProduction ? "production" : "development",
  devtool: isProduction ? "source-map" : "eval-source-map",
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      inject: false,
      filename: "demo-react-ts.html",
    }),
    new Dotenv()
  ],
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "demo-react-ts.bundle.js",
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        use: ["@svgr/webpack"],
      },
      {
        test: /\.(ts|tsx|js)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      {
        test: /\.css$/i,
        include: path.resolve(__dirname, 'src'),
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
    ],
  },
  devServer: {
    https: true,
    port: 9025,
    static: {
      directory: path.resolve(__dirname, "src"),
    },
    historyApiFallback: {
      index: "index.html",
    },
  },
};
