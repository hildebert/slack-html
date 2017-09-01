import ejs from 'ejs';
import config from '../config/config';
import path from 'path';
import fs from 'fs';
import html from 'html';
const hash = Date.now();

/**
 * Create build dir if it doesn't exist
 */
if (!fs.existsSync(config.buildDir)) {
	fs.mkdirSync(config.buildDir);
}

fs.readdirSync(config.templatesDir)
	.filter(file => file.indexOf('.ejs') > -1)
	.forEach(file => {
		const templatePath = path.join(config.templatesDir, file);
		const targetPath = path.join(config.buildDir, file.replace('.ejs', '.html'));

		let generatedHTML = ejs.render(fs.readFileSync(templatePath, 'utf-8'), {
			/**
			 * "env" variable will be available in templates
			 * to make conditions
			 */
			env: process.env.NODE_ENV,
			/**
			 * Hash can be added to <script> and <link>
			 * tags to override browser's cache
			 */
			hash,
			filename: templatePath,
			/**
			 * Name of current file to mark links active, for e.g.
			 */
			currentPage: file.replace('.ejs', '.html')
		});

		generatedHTML = html.prettyPrint(generatedHTML, {unformatted: []});

		fs.writeFileSync(targetPath, generatedHTML);
		console.log(`Rendered ${targetPath}`);
	});
