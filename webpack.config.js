module.exports = {
	mode: "development",
	entry: "./index.ts",
	output: {
		filename: "./index.js",
		library: "parallelqueue",
		libraryTarget: "umd"
	},
	resolve: {
		extensions: [".ts", ".tsx", ".js"]
	},
	module: {
		rules: [{ test: /.tsx?$/, loader: "ts-loader" }]
	}
};
