import path from 'path';
import config from '../config/config';
import fs from 'fs';
const SVGO = require('svgo');
const imagemin = require('imagemin');
const imageminJpegtran = require('imagemin-jpegtran');
const imageminPngquant = require('imagemin-pngquant');

const imgDir = path.join(config.buildDir, 'img');

/**
 * JPG, PNG
 */
imagemin([imgDir + '/**/*.{jpg,png}'], imgDir, {
	plugins: [
		imageminJpegtran(),
		imageminPngquant({quality: '65-80'})
	]
}).then(files => files.map(x => console.log(path.basename(x.path))));

/**
 * SVG
 */
const svgo = new SVGO();

fs.readdirSync(imgDir)
	.filter(file => /\.svg$/.test(file))
	.forEach(file => {
		const filePath = path.join(imgDir, file);
		const content = fs.readFileSync(filePath, 'utf-8');

		svgo.optimize(content, function (result) {
			if (result.error) {
				return false;
			}

			fs.writeFileSync(filePath, result.data);
			console.log(file);
		});
	});
