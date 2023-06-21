const express = require('express');
const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    email: String,
    password: String,
    form_id: [Number]
});


const Admin = mongoose.model('Admin', adminSchema);
module.exports = Admin;