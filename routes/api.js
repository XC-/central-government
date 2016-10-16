/**
 * Created by xc- on 16.10.2016.
 */
const express = require('express');
const Services = require('../models/Service');
const StatusCodes = require('../utils/StatusCodes');
const DBErrorHandler = require('../utils/DefaultDBErrorHandler');

const router = express.Router();

router.get('/', (req, res) => {
  Services.find()
    .exec()
    .then((results) => {
      var serviceNames = [];
      for (var i = 0; i < results.length; i++) {
        serviceNames.push(results[i].name);
      }
      return res.json(serviceNames);
    })
    .catch((reason) => DBErrorHandler(reason, res));
});

router.get('/:name', (req, res) => {
  if (typeof req.params.name !== 'string') return res.status(StatusCodes.BadRequest).send();

  Services.find()
    .where('name', req.params.name)
    .exec()
    .then((results) => {
      if (results.length > 1) {
        return res.status(StatusCodes.Conflict).json({
          message: 'Service name not unique'
        })
      } else if (results.length === 0) {
        return res.status(StatusCodes.NotFound).send();
      }
      return res.status(StatusCodes.OK).json(results[0]);
    })
    .catch((reason) => DBErrorHandler(reason, res));
});

router.post('/', (req, res) => {
  Services.create(req.body)
    .then((docs) => {
      return res.status(StatusCodes.OK).json(docs);
    })
    .catch((reason) => DBErrorHandler(reason, res));
});

router.delete('/:name', (req, res) => {
  if (typeof req.params.name !== 'string') return res.status(StatusCodes.BadRequest).send();

  Services.find()
    .where('name', req.params.name)
    .where('protected', false)
    .remove()
    .exec()
    .then((obj) => {
      console.log(obj);
      return res.status(StatusCodes.OK).send();
    })
    .catch((reason) => DBErrorHandler(reason, res));
});

module.exports = router;
