module.exports = {
  mode: "development",
  entry: "./src/index.ts",
  output: {
    path: `${__dirname}/public`,
    filename: "bundle.js",
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  module: {
    rules: [
      { 
        test: /\.ts$/,
        loader: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jpe?g|gif|jp2|webp)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          outputPath : './assets'
        }
      }
    ],
  },
};
