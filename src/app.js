const express = require('express');
const planetsRouter = require('./routes/planet/planets.router')

const app = express();
app.use(express.json())

app.use(planetsRouter)
module.exports = app