import express from 'express';
import opener from 'opener';
import config from '../config/config';

const app = express();

app.use('/', express.static(config.buildDir));

app.listen(config.prodPort, () => {
	const host = config.host === '0.0.0.0' ? 'localhost' : config.host;
	console.log(`Listening at ${host}:${config.prodPort}`);
	opener(`http://${host}:${config.prodPort}`);
});
