/**
 * Created by xc- on 16.10.2016.
 */
const StatusCodes = require('./StatusCodes');

module.exports = (reason, res) => {
  if (reason.name && reason.name === 'MongoError') {
    if (reason.code) {
      switch(reason.code) {
        case (11000):
          return res.status(StatusCodes.Conflict).json({
            message: 'Duplicate name, prefix or port!'
          });
          break;
      }
    }
  }
  return res.status(StatusCodes.InternalError).json({
    message: 'DB Error...'
  });
};
