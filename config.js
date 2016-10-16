/**
 * Created by xc- on 16.10.2016.
 */
const logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');

const config = {
  middleware: {
    pre: [
      cors(),
      logger('dev'),
      bodyParser.json(),
      bodyParser.urlencoded({extended: false})
    ]
  },
  routes: {
    '/': require('./routes/api')
  }
};

module.exports = config;
