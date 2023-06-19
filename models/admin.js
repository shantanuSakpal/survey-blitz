const express = require('express');
const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    email: String,
    password: String,
    formObjectsArray: [Object]
});


const Admin = mongoose.model('Admin', adminSchema);
module.exports = Admin;