var path = require('path');

module.exports = {
	port: '5000',
	root: path.resolve('./'),
  outputDir: './server/public/assets',
  env: process.env.NODE_ENV || 'development'
};
