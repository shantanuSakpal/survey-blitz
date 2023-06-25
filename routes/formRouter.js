const express = require('express');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Admin = require('../models/admin');
const Form = require("../models/form")
const Response = require("../models/response")

const router = express.Router();

const SECRET_KEY = 'sass-form-generator-done-by-jsonwebtoken$@123456'

router.get('/getFormQuestions/:id/:form_name', async (req, res) => {
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
router.get('/getUserResponse/:userId', async (req, res) => {
    const userId = req.params.userId;
    console.log("userId", userId)

    try {
        const userResponse = await Response.findOne({ "user_id": userId });
        if (userResponse) {
            res.json(userResponse);
        } else {
            res.json({ success: false, message: 'User form not found' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});


router.post('/saveResponse', async (req, res) => {
    const { user_id, formObject } = req.body;
    try {
        const response = new Response({ user_id, formObject });
        await response.save();
        res.status(201).json({ result: response });
    }
    catch (error) {
        res.status(500).json({ message: 'Something went wrong' });  
    }
});



module.exports = router;
