const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const pkg = require("./package");
const ExtractCssChunks = require("extract-css-chunks-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const log = require("fancy-log");
const colors = require("ansi-colors");

/* Local variables */
const executingCommand = process.env.npm_lifecycle_event;

const isProd = executingCommand === "build";
const isTest = /^test/.test(executingCommand);

const apiUrlPrefix = setDefaultIfNotSet(process.env.API_URL_PREFIX, "");

const apiDomain = setDefaultIfNotSet(
  process.env.API_DOMAIN,
  "http://localhost:5000"
);
const frontDomain = setDefaultIfNotSet(
  process.env.FRONT_DOMAIN,
  "http://localhost:9000"
);
const environment = isProd ? "production" : "development";

logEnvironmentVariables();

/*Configuration settings */
module.exports = {
  mode: environment,
  entry: isTest
    ? null
    : {
        app: ["babel-polyfill", "./app/index.js"]
      },
  output: {
    path: path.join(__dirname, "dist"),
    chunkFilename: `vendors-${pkg.version}.js`,
    filename: `app-${pkg.version}.js`
  },
  devtool: isProd ? false : "cheap-module-eval-source-map",
  resolve: {
    alias: {
      jquery: "jquery/src/jquery",
      jsPDF: "jspdf/dist/jspdf.min.js"
    },
    modules: [path.resolve("./"), path.resolve("./node_modules")]
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      jsPDF: "jsPDF"
    }),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "./app/index.html"
    }),
    new ExtractCssChunks({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: `app-${pkg.version}.css`,
      chunkFilename: `vendors-${pkg.version}.css`
    }),
    new CopyWebpackPlugin([
      {
        from: "./app/**/*.html",
        to: `[1]/[name]-${pkg.version}.[ext]`,
        test: /app\/(.*)\/(.*).html/,
        ignore: "index.html"
      },
      {
        context: "app",
        from: "./misc/*",
        to: `.`
      },
      {
        context: "app",
        from: "./images/*",
        to: `.`
      },
      {
        from: "./app/robots.txt",
        to: `.`
      },
      {
        from: "./app/favicon.ico",
        to: `.`
      }
    ])
  ],
  optimization: {
    // We no not want to minimize our code.
    minimize: false,
    splitChunks: !isProd
      ? false
      : {
          chunks: "all"
        }
  },
  module: {
    strictExportPresence: true,
    rules: [
      // Load raw HTML files for templates
      { test: /\.(html)$/, loader: "raw-loader" },
      // Load js files through Babel
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      },
      {
        test: /settings\.js$/,
        loader: "string-replace-loader",
        options: {
          multiple: [
            { search: "{{API_DOMAIN}}", replace: apiDomain, strict: true },
            {
              search: "{{API_URL_PREFIX}}",
              replace: apiUrlPrefix,
              strict: true
            },
            { search: "{{FRONT_DOMAIN}}", replace: frontDomain, strict: true },
            { search: "{{FRONT_VERSION}}", replace: pkg.version, strict: true },
            { search: "{{ENVIRONMENT}}", replace: environment, strict: true }
          ]
        }
      },
      {
        test: /\.(scss|css)$/,
        use: [ExtractCssChunks.loader, "css-loader", "sass-loader"]
      },
      {
        test: /\.(otf|eot|svg|ttf|woff|woff2)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8192,
              name: `fonts/[name]-${pkg.version}.[ext]`
            }
          }
        ]
      }
    ]
  },
  devServer: {
    port: 9000,
    compress: true,
    contentBase: path.join(__dirname, "app")
  }
};

function setDefaultIfNotSet(variableToTest, defaultValue) {
  return _isNullOrUndefined(variableToTest) ? defaultValue : variableToTest;
}

function _isNullOrUndefined(value) {
  return value === null || value === undefined;
}

function logEnvironmentVariables() {
  log("NODE_ENV", colors.cyan(isTest ? "test" : environment));
  log("API_DOMAIN", colors.cyan(apiDomain));
  log("FRONT_DOMAIN", colors.cyan(frontDomain));
  log("API_URL_PREFIX", colors.cyan(apiUrlPrefix));
}
