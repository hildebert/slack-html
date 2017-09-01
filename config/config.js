import path from 'path';

export default {
	/**
	 * Source dir where JavaScript, styles and templates are stored
	 */
	sourceDir: path.resolve(path.join(__dirname, '/../src')),
	/**
	 * Templating engine of choise (only Ejs at this moment)
	 */
	templateEngine: 'ejs',
	/**
	 * Path where templates are stored
	 */
	templatesDir: path.resolve(path.join(__dirname, '/../src/templates')),
	/**
	 * Path where generated files are stored
	 */
	buildDir: path.resolve(path.join(__dirname, '/../_html')),
	/**
	 * Path where webpack DLLs are stored
	 */
	dllDir: path.join(path.resolve(path.join(__dirname, '/../node_modules')), '_dll'),
	/**
	 * JavaScript DLL file name
	 */
	dllFileName: 'vendors.js',
	/**
	 * Port on which development server works
	 */
	devPort: 3000,
	/**
	 * Port on which "production" server works
	 */
	prodPort: 8080,
	/**
	 * Host
	 */
	host: '0.0.0.0',
	/**
	 * Directories in sourceDirs that with static content
	 * which will be served by development server. This directories
	 * will also be added to "resolve.alias" part of Webpack's
	 * config, so you can do this:
	 * require('img/img.png')
	 * without putting relative path to an asset
	 */
	staticDirs: ['img', 'fonts'],
	/**
	 * Directories in sourceDirs that will be copied
	 * "as is" to buildDir
	 */
	copyDirs: ['img', 'fonts'],
	/**
	 * Aliases to "resolve.alias" part of Webpack's config,
	 * necessary for some older libraries and jQuery plugins
	 */
	aliases: {
		'masonry': 'masonry-layout',
		'isotope': 'isotope-layout'
	}
};
