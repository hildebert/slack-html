import path from 'path';
import webpack from 'webpack';
import config from '../config/config';
import cssMqpacker from 'css-mqpacker';
import autoprefixer from 'autoprefixer';

import defaultLoaders from './util/defaultLoaders';

const baseConfig = {
	cache: true,
	entry: {
		app: path.join(config.sourceDir, 'index.js')
	},
	output: {
		path: config.buildDir,
		filename: 'js/[name].js',
		publicPath: '/'
	},
	plugins: [
		new webpack.DllReferencePlugin({
			context: config.sourceDir,
			manifest: require(path.join(config.dllDir,
				`vendors-${process.env.NODE_ENV === 'development' ? 'development' : 'production'}-manifest.json`))
		}),
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify(process.env.NODE_ENV)
			}
		}),
		new webpack.LoaderOptionsPlugin({
			options: {
				postcss: [
					autoprefixer({
						browsers: ['last 2 versions'],
						remove: false
					}),
					cssMqpacker()
				]
			}
		}),
		new webpack.ProvidePlugin({
			_: 'lodash'
		}),
		new webpack.ProvidePlugin({
			$: 'jquery',
			jQuery: 'jquery',
			'window.jQuery': 'jquery'
		})
	],
	module: {
		loaders: defaultLoaders
	},
	resolve: {
		modules: ['src', 'node_modules'],
		extensions: ['.js'],
		alias: {
			style: path.join(config.sourceDir, 'style')
		}
	}
};

if (config.staticDirs) {
	config.staticDirs.forEach(dir => {
		baseConfig.resolve.alias[dir] = path.join(config.sourceDir, dir);
	});
}

if (typeof config.aliases === 'object') {
	Object.keys(config.aliases).forEach(key => {
		baseConfig.resolve.alias[key] = config.aliases[key];
	});
}

export default baseConfig;
