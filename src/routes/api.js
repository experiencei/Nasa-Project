const express = require('express')

const planetsRouter = require('./planet/planets.router');
const launchesRouter = require('./launches/launches.router');

const api = express.Router();

api.use("/planets" ,planetsRouter);
api.use("/launches" ,launchesRouter);


modules.exports = api;