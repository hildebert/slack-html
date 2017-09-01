/**
 * Put 3rd party libraries here. They will be added to a DLL
 * file and will be excluded from Webpack's dev builds, speeding
 * them up significantly. Libraries from this file will be stored
 * in `${config.buildDir}/js/vendors.js`.
 *
 * Beware that some libraries (e.g. Bootstrap's JS) don't play well
 * with DLL and have not be included here.
 *
 * For more on how DLL work in Webpack see
 * https://robertknight.github.io/posts/webpack-dll-plugins/
 */
require('jquery');
