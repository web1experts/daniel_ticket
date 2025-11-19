const mongoose = require('mongoose');

const Model = {}

Model.mongoose = mongoose
Model.User = require('./user.model');

module.exports = Model // export all models from one placeUserUpload