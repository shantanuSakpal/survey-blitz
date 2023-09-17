const express = require('express');
const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    email: String,
    username:String,
    password: String,
    form_id: [Number]
});


const Admin = mongoose.model('Admin', adminSchema);
module.exports = Admin;