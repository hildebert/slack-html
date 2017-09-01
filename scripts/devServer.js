import path from 'path';
import express from 'express';
import opener from 'opener';
import watch from 'node-watch';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpack from 'webpack';
import config from '../config/config';
import webpackConfig from '../webpack/webpack.config.dev';

const app = express();

/**
 * Set view engine and views directory
 */
app.set('view engine', config.templateEngine);
app.set('views', config.templatesDir);

/**
 * Serve content from directories that are in `config.staticDirs` array
 */
if (config.staticDirs) {
	config.staticDirs.forEach(dir => {
		app.use(`/${dir}`, express.static(path.join(config.sourceDir, dir)));
	});
}

/**
 * This is needed to serve Webpack DLL files
 */
app.use('/node_modules', express.static(path.join(__dirname, '/../node_modules')));

const compiler = webpack(webpackConfig);

app.use(webpackDevMiddleware(compiler, {
	publicPath: webpackConfig.output.publicPath,
	quiet: true,
	stats: {
		colors: true
	},
	serverSideRender: true
}));

const hotMiddleware = webpackHotMiddleware(compiler);

/**
 * Watch all files is template directory and reload browser
 * on file change
 */
watch(config.sourceDir, { filter: /\.ejs/, recursive: true }, (evt, name) => {
	hotMiddleware.publish({action: 'reload'});
});

app.use(hotMiddleware);

/**
 * Render templates on *.html requests
 */
app.get(/^(\/|.*\.html)$/, (req, res) => {
	let template = req.path;

	if (template === '/') {
		template = 'index.html';
	}

	template = path.join(config.templatesDir, template.replace('.html', ''));

	res.render(template, {
		env: process.env.NODE_ENV,
		currentPage: req.path.replace('/', '')
	});
});

app.listen(config.devPort, () => {
	const host = config.host === '0.0.0.0' ? 'localhost' : config.host;
	console.log(`Listening at ${host}:${config.devPort}`);
	opener(`http://${host}:${config.devPort}`);
});
