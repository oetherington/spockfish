/** @type {import('next').NextConfig} */
module.exports = {
	reactStrictMode: true,
	webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
		config.module.rules.push({
			test: /\.mp3/,
			loader: 'file-loader',
			options: {
				name: 'static/media/[name].[hash:8].[ext]',
			},
		});

		config.optimization.splitChunks = {
			chunks: 'async',
			minSize: 20000,
			minRemainingSize: 0,
			minChunks: 1,
			maxAsyncRequests: 30,
			maxInitialRequests: 30,
			enforceSizeThreshold: 50000,
			cacheGroups: {
				defaultVendors: {
					test: /[\\/]node_modules[\\/]/,
						priority: -10,
						reuseExistingChunk: true,
					},
				default: {
					minChunks: 2,
					priority: -20,
					reuseExistingChunk: true,
				},
			},
		};

		return config;
	},
}
