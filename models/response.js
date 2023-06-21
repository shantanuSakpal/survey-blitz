const express = require('express');
const mongoose = require('mongoose');

const responseSchema = new mongoose.Schema({
    user_id: String,
    formObject: Object
});


const Form = mongoose.model('Form', formSchema);
module.exports = Form;