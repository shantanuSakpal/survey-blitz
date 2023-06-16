const express = require('express');
const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    email: String,
    password: String,
    formObject:{ 
        type: Array,
    } ,
});

const Admin = mongoose.model('Admin', adminSchema);
module.exports = Admin;