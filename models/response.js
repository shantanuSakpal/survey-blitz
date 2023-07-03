const express = require('express');
const mongoose = require('mongoose');

const responseSchema = new mongoose.Schema({
    user_id:String,
    formObject: Object,
    form_id: String,
});

const Response = mongoose.model('Response', responseSchema);
module.exports = Response;