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
		return config;
	},
}
