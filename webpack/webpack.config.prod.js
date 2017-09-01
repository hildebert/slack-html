import addBundleAnalyzerPlugin from './util/addBundleAnalyzerPlugin';
import path from 'path';
import config from '../config/config';
import merge from 'merge-deep';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import uglifyPlugin from './util/uglifyPlugin';
import baseWebpackConfig from './webpack.config.base';

const productionConfig = merge(
	baseWebpackConfig,
	{
		output: {
			chunkFilename: '[name].js'
		},
		plugins: [
			new CopyWebpackPlugin([{
				from: path.join(config.dllDir, `vendors.${process.env.NODE_ENV}.js`),
				to: path.join(config.buildDir, '/js/vendors.js')
			}]),
			new ExtractTextPlugin('css/main.css'),
			uglifyPlugin
		]
	}
);

(config.copyDirs || []).forEach(dir => {
	productionConfig.plugins.push(new CopyWebpackPlugin([{
		from: path.join(config.sourceDir, dir),
		to: path.join(config.buildDir, dir)
	}]));
});

productionConfig.module.loaders.filter(loader =>
	loader.loaders && loader.loaders.find(name => /css/.test(name.split('?')[0]))
).forEach(loader => {
	const [fallback, ...rest] = loader.loaders;
	loader.loader = ExtractTextPlugin.extract({
		fallback,
		use: rest
	});

	delete loader.loaders;
});

// export default productionConfig;
export default addBundleAnalyzerPlugin(productionConfig);
