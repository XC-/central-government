/**
 * Created by xc- on 16.10.2016.
 */

const express = require('express');
const expressopot = require('expressopot');
const mongoose = require('mongoose');

const config = require('./config');
const Services = require('./models/Service');

const SELF_NAME = 'CentralGovernor';

const MONGODB_ADDRESS = 'mongodb://localhost';
const MONGODB_PORT = '27017';
const MONGODB_DATABASE = 'CentralGovernor';
const MONGODB_REPLICASET = undefined;

var connection_string = `${MONGODB_ADDRESS}:${MONGODB_PORT}/${MONGODB_DATABASE}`;
if (MONGODB_REPLICASET) {
  connection_string += `?replicaSet=${MONGODB_REPLICASET}`
}
mongoose.Promise = global.Promise;

mongoose.connect(connection_string);

const db = mongoose.connection;

db.on('error', (error) => {
  console.error('Connection error: ', error);
  process.exit(1);
});

db.once('open', () => {
  Services.find()
    .where('name', SELF_NAME)
    .exec()
    .then((results) => {
      if (results.length > 1) {
        throw Error('Service name not unique!');
      } else if (results.length === 0) {
        throw Error('Service not found!');
      }
      const serviceConfiguration = results[0];
      const app = expressopot(express(), config, serviceConfiguration.prefix);

      const port = serviceConfiguration.port || 3131;
      app.listen(port, (err) => {
        if (err) {
          console.error(err);
          process.exit(1);
        }
        console.info('Listening port: ', port)
      })

    })
    .catch((reason) => {
      console.error(reason);
      process.exit(1);
    });
});

