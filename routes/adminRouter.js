    const express = require('express');
    const _ = require('lodash');
    const bcrypt = require('bcrypt');
    const jwt = require('jsonwebtoken');
    const Admin = require('../models/admin');
    const Form = require("../models/form")
    const Response = require("../models/response")
    const router = express.Router();

    const SECRET_KEY = 'sass-form-generator-done-by-jsonwebtoken$@123456'

function emailIsValid (email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

// signUp route
router.post('/signUp', async (req, res) => {
    const { email, password,userName } = req.body;

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
            userName,
            password: hashedPassword,
        });
        const token = jwt.sign({email : admin.email ,id : admin._id }, SECRET_KEY);
        res.status(200).json({ result: admin, token : token });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
    }
});

router.post('/signIn', async (req, res) => {
    const { email, password} = req.body;

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
            jwt.verify(token, SECRET_KEY, async (err) => {
                if (err) {
                    return res.status(401).json({ message: 'Unauthorized' });
                } else {
                    const admin = await Admin.findOne({ email });
                    if (!admin)
                        return res.status(404).json({ message: "User doesn't exist" });

                    // Check if a form with the same name already exists for the admin
                    const existingForm = await Form.findOne({
                        admin_id: admin._id,
                        'formObject.form_name': formObject.form_name,
                    });
                    if (existingForm) {
                        return res
                            .status(400)
                            .json({ message: 'Form with the same name already exists' });
                    }

                    admin.form_id.push(formObject.form_id);
                    await admin.save();

                    formObject.url =
                        '/' + admin._id + '/' + _.kebabCase(formObject.form_name);
                    const form = await Form.create({
                        admin_id: admin._id,
                        form_id: formObject.form_id,
                        formObject: formObject,
                    });
                    res.status(200).json({ result: form });
                }
            });
        } catch (error) {
            res.status(500).json({ message: 'Something went wrong' });
        }
    });

    // Update form API endpoint
    router.put('/updateForm', async (req, res) => {
        const { email, token, formObject } = req.body;
        console.log("updating")
        try {
            jwt.verify(token, SECRET_KEY, async (err) => {
                if (err) {
                    return res.status(401).json({ message: 'Unauthorized' });
                } else {
                    const admin = await Admin.findOne({ email });
                    if (!admin) {
                        return res.status(404).json({ message: "User doesn't exist" });
                    }

                    // Find the form by form name and admin ID
                    const form = await Form.findOne({
                        admin_id: admin._id,
                        'formObject.form_name': formObject.form_name,
                    });

                    if (!form) {
                        return res.status(404).json({ message: "Form doesn't exist" });
                    }

                    // Update the formObject with the new formObject
                    form.formObject = formObject;
                    await form.save();

                    res.status(200).json({ result: form });
                }
            });
        } catch (error) {
            res.status(500).json({ message: 'Something went wrong' });
        }
    });


    // api to get all forms of a particular admin
    router.get('/getForms', async (req, res) => {
        const { email, token } = req.query; // Update here

        try {
            jwt.verify(token, SECRET_KEY, async (err) => {
                if (err) {
                    return res.status(401).json({ message: 'Unauthorized' });
                } else {
                    const admin = await Admin.findOne({ email });
                    if (!admin)
                        return res.status(404).json({ message: "User doesn't exist" });
                    const forms = await Form.find({ admin_id: admin._id });
                    res.status(200).json({ forms: forms });
                }
            });
        } catch (error) {
            res.status(500).json({ message: 'Something went wrong' });
        }
    });

    router.get('/getForm', async (req, res) => {
        const { form_id } = req.query; // Use req.query instead of req.body
        try {
            const form = await Form.findOne({ form_id:form_id });
            if (!form)
                return res.status(404).json({ message: "Form doesn't exist" });

            res.status(200).json({ form: form.formObject });
        } catch (error) {
            res.status(500).json({ message: 'Something went wrong' });
        }
    });

    router.post('/getFormById', async (req, res) => {
       const {form_id, token} = req.body;
       try {
        jwt.verify(token, SECRET_KEY, async (err) => {
            if (err) {
                return res.status(401).json({ message: 'Unauthorized' });
            } else {
                const responses = await Response.find({"formObject.form_id":form_id});
                if (!responses)
                    return res.status(404).json({ message: "Form doesn't exist" }); 
                res.status(200).json({ responses: responses }); 
            }
        });
       } catch(e) { 
              return res.status(500).json({ message: 'Something went wrong' });
       }
    });

module.exports = router;
