const express = require('express');
const mongoose = require('mongoose');

const responseSchema = new mongoose.Schema({
    user_id: String,
    formObject: Object
});


const ResponseForm = mongoose.model('ResponseForm', responseSchema);
module.exports = ResponseForm;