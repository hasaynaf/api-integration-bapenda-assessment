/**
 * Module dependencies.
 */
const express = require('express')
const path = require('path')
const fs = require("fs")
const rfs = require("rotating-file-stream")
const createError = require('http-errors')
const logger = require("morgan");
const apicache = require("apicache");
const routes = require('./routes')

/**
 * Main.
 */
const app = express()

app.use(express.json())

const logDirectory = path.join(__dirname, "logs")
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory)
const accessLogStream = rfs.createStream("access.log", {
	interval: "1d",
	path: logDirectory,
})

app.use(logger("dev"))
app.use(logger("combined", { stream: accessLogStream }))

let cache = apicache.middleware
app.use(cache('5 minutes'))

app.use('/api', routes.test)

// catch 404 and forward to error handler

app.use(function(req, res, next) {
  next(createError(404))
})

module.exports = app
