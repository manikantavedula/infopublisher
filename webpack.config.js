const Dotenv = require("dotenv-webpack");

module.exports = {
  // ...
  plugins: [new Dotenv()],
  rules: [
    {
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: "babel-loader",
        options: {
          plugins: [["@babel/plugin-transform-react-jsx", { throwIfNamespace: false }]],
        },
      },
    },
  ],
};
