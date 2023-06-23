    const express = require('express');
    const _ = require('lodash');
    const bcrypt = require('bcrypt');
    const jwt = require('jsonwebtoken');
    const Admin = require('../models/admin');
    const Form = require("../models/form")

    const router = express.Router();

    const SECRET_KEY = 'sass-form-generator-done-by-jsonwebtoken$@123456'

function emailIsValid (email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

// signUp route
router.post('/signUp', async (req, res) => {
    const { email, password } = req.body;

    if(!emailIsValid(email)) 
        return res.status(400).send({ message: 'Invalid email' });
    
    if(password.length < 6)
        return res.status(400).send({ message: 'Password must be at least 6 characters' });

    try {
        const existingUser = await Admin.findOne({ email });
        if (existingUser) 
            return res.status(400).send({ message: 'User already exists' });
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const admin = await Admin.create({
            email,
            password: hashedPassword,
        });
        const token = jwt.sign({email : admin.email ,id : admin._id }, SECRET_KEY);
        res.status(200).json({ result: admin, token : token });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
    }
});

router.post('/signIn', async (req, res) => {
    const { email, password } = req.body;

    try {
        const existingUser = await Admin.findOne({ email });
        if (!existingUser)
            return res.status(404).json({ message: "User doesn't exist" });

        const isPasswordCorrect = await bcrypt.compare( password, existingUser.password );
        if (!isPasswordCorrect)
            return res.status(400).json({ message: 'Invalid credentials' });

        const token = jwt.sign({email : existingUser.email ,id : existingUser._id }, SECRET_KEY);
        res.status(200).json({ result: existingUser, token : token });

    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
    }
});

router.post('/createForm', async (req, res) => {
    const { email, token, formObject } = req.body;
    try {
        jwt.verify(token, SECRET_KEY, async (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: 'Unauthorized' });
            } else {
                const admin = await Admin.findOne({ email });
                if (!admin)
                    return res.status(404).json({ message: "User doesn't exist" });
        
                admin.form_id.push(formObject.form_id);          
                await admin.save();

                formObject.url = '/' + admin._id + '/' + _.kebabCase(formObject.form_name);
                const form = await Form.create({admin_id : admin._id, form_id : formObject.form_id, formObject : formObject});
                console.log(form);
                res.status(200).json({ result : form });
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
    }
});

router.post('/updateForm', async (req, res) => {
    const { email, token, formObject } = req.body;
    try {   
        jwt.verify(token, SECRET_KEY, async (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: 'Unauthorized' });
            } else {
                const form = await Form.findOne({form_id : formObject.form_id});
                if (!form)
                    return res.status(404).json({ message: "Form doesn't exist" });
                form.formObject = formObject;
                await form.save();
                res.status(200).json({ result : form });
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
    }
});

// api to get all forms of a particular admin
router.get('/getForms', async (req, res) => {
    const { email, token } = req.body;
    try {
        jwt.verify(token, SECRET_KEY, async (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: 'Unauthorized' });
            } else {
                const admin = await Admin.findOne({ email });
                console.log(admin);
                if (!admin)
                    return res.status(404).json({ message: "User doesn't exist" });
                const forms = await Form.find({admin_id : admin._id});
                res.status(200).json({ forms : forms });
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
    }
});



module.exports = router;
