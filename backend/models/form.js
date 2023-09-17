const express = require('express');
const mongoose = require('mongoose');

const formSchema = new mongoose.Schema({
    admin_id: String,
    form_id: String,
    formObject: Object
});

const Form = mongoose.model('Form', formSchema);
module.exports = Form;