const path = require("path");

module.exports = {
  entry: {
    bundle: path.join(__dirname, "./src/index.js")
  },

  output: {
    filename: "yop.js",
    path: path.join(__dirname, "dist")
  },

  mode: process.env.NODE_ENV || "development",

  watchOptions: {
    ignored: /node_modules|dist|\.ts/g
  },

  devtool: "cheap-module-eval-source-map",

  resolve: {
    extensions: [".js", ".jsx", ".js", ".json"],
    plugins: []
  },

  module: {
    rules: [
      {
        test: /\.m?js$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
            plugins: ["@babel/plugin-proposal-class-properties"]
          }
        }
      }
    ]
  },
  // watch: true,
  node: {
    fs: "empty"
  }
};
