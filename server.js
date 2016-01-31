/* eslint no-console: 0, no-underscore-dangle: 0*/
const path = require('path');
const express = require('express');
const webpack = require('webpack');
const webpackMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackConfig = require('./webpack.config.js');
const config = require('./config.js');
const compression = require('compression');

const app = express();
const __DEVELOPMENT__ = !config.isProduction;

if (__DEVELOPMENT__) {
  console.log('----Development---- env: ' + process.env.NODE_ENV);
  const compiler = webpack(webpackConfig);
  const middleware = webpackMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
    contentBase: 'src',
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false,
    },
  });

  app.use(middleware);
  app.use(webpackHotMiddleware(compiler));
  app.get('/', (req, res) => {
    res.write(middleware.fileSystem.readFileSync(path.join(__dirname, 'dist/index.html')));
    res.end();
  });
} else {
  console.log('----Production----env: ' + process.env.NODE_ENV);
  app.use(compression());
  app.use(express.static(__dirname + '/dist'));
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
  });
}

if (config.port) {
  app.listen(config.port, (err) => {
    if (err) {
      console.error(err);
    }
    console.info('==> 💻  Open http://%s:%s in a browser to view the app.', config.host, config.port);
  });
} else {
  console.error('==>     ERROR: No PORT environment variable has been specified');
}
