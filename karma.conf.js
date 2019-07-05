var webpackConfig = require("./webpack.config");
module.exports = function(config) {
	config.set({
		basePath: "",
		frameworks: ["jasmine"],
		files: [
			{
				pattern: "*.spec.*"
			}
		],
		exclude: [],
		preprocessors: {
			"*.spec.*": ["webpack"]
		},
		webpack: webpackConfig,
		reporters: ["progress"],
		colors: true,
		logLevel: config.LOG_INFO,
		browsers: ["Chrome"],
		mime: {
			"text/x-typescript": ["ts", "tsx"]
		}
	});
};
