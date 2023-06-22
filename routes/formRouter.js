const express = require('express');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Admin = require('../models/admin');
const Form = require("../models/form")

const router = express.Router();

const SECRET_KEY = 'sass-form-generator-done-by-jsonwebtoken$@123456'

router.get('/:id/:form_name', async (req, res) => {
    const { id, form_name } = req.params;
    try {
        const form = await Form.findOne({ 'formObject.url' : '/' + id + '/' + form_name });
        if (!form)
            return res.status(404).json({ message: "Form doesnt exist" });
        res.status(200).json({ result: form });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
    }
});



module.exports = router;
