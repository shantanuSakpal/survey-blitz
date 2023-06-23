const express = require('express');
const mongoose = require('mongoose');

const responseSchema = new mongoose.Schema({
    formObject: Object
});

const Response = mongoose.model('Response', responseSchema);
module.exports = Response;