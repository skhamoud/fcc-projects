const path = require("path");
module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "bundle.js"
  },
  devtool: "inline-source-map",
  devServer: {
    contentBase: "./build/",
    compress: true,
    port: 5000,
    open: true
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
      // {
      //   test: /\.(png|svg|jpg|gif)$/,
      //   use: ["file-loader"]
      // }
    ]
  }
};
