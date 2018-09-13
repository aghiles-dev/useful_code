const webpackConfig = require("./webpack.config");

const KARMA_BROWSER = process.env.KARMA_BROWSER || "ChromeHeadless";

const isWatchModeActivated = /:watch/.test(process.env.npm_lifecycle_event);

module.exports = function(config) {
  config.set({
    basePath: "",
    frameworks: ["jasmine", "sinon"],
    files: ["test/karma.entry.js"],
    preprocessors: {
      "test/karma.entry.js": ["webpack"],
      "test/unit/**/*.spec.js": ["webpack"]
    },
    coverageReporter: {
      type: "text-summary",
      reporters: [{ type: "text-summary" }]
    },
    webpack: webpackConfig,
    webpackMiddleware: {
      // webpack-dev-middleware configuration
      // i.e.
      noInfo: true,
      // and use stats to turn off verbose output
      stats: "errors-only"
    },
    reporters: [isWatchModeActivated ? "mocha" : "dots"],
    browsers: [KARMA_BROWSER],
    logLevel: config.LOG_INFO,
    singleRun: !isWatchModeActivated,
    client: { captureConsole: true },
    mochaReporter: { ignoreSkipped: true },
    concurrency: Infinity
  });
};
