/**
 * Entry point to the application.
 * Require necessary libraries and set up hot reloading.
 *
 * Do not put client code in here.
 */
require('./style/main.scss');
require('./components/index.js');

if (module.hot) {
	/**
	 * Set up hot reloading of ./components/index.js
	 * and all files that are imported there. This
	 * is where you should put your JavaScript.
	 */
	module.hot.accept('./components/index.js', () => {
		require('./components/index.js');
	});

	/**
	 * Listen to 'reload' event that webpack-hot-middleware
	 * sends. Used to reload page on templates files changes
	 */
	const hotClient = require('webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true');

	hotClient.subscribe(event => {
		if (event.action === 'reload') {
			window.location.reload();
		}
	});
}
