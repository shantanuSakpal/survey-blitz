const express = require('express');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Admin = require('../models/admin');
const Form = require("../models/form")
const Response = require("../models/response")
const router = express.Router();

const SECRET_KEY = 'sass-form-generator-done-by-jsonwebtoken$@123456'

const emailIsValid = require('../helpers/helper').emailIsValid;
const passwordIsValid = require('../helpers/helper').passwordIsValid;

// signUp route
router.post('/signUp', async (req, res) => {
    const { email, password,username } = req.body;

    if(!emailIsValid(email))
        return res.status(400).send({ message: 'Invalid email' });

    if(!passwordIsValid(password))
        return res.status(400).send({ message: 'Password must be at least 6 characters' });

    try {
        const existingUser = await Admin.findOne({ email });
        if (existingUser)
            return res.status(400).send({ message: 'User already exists' });
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const admin = await Admin.create({
            email,
            username,
            password: hashedPassword,
        });
        const token = jwt.sign({ email: admin.email, id: admin._id }, SECRET_KEY);
        res.status(200).json({ result: admin, token: token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/signIn', async (req, res) => {
    const { email, password } = req.body;

    try {
        const existingUser = await Admin.findOne({ email });
        if (!existingUser)
            return res.status(404).json({ message: "User doesn't exist" });

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordCorrect)
            return res.status(400).json({ message: 'Invalid credentials' });

        const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, SECRET_KEY);
        res.status(200).json({ result: existingUser, token: token });

    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
    }
});

//check if user already exists
router.post('/checkUser', async (req, res) => {
    const { email } = req.body;
    try {
        if(!emailIsValid(email))
            return res.status(400).send({ message: 'Invalid email' });
        const existingUser = await Admin.findOne({ email });
        if (existingUser)
            return res.status(401).send({ message: 'User already exists' });
        res.status(200).json({ message: 'User does not exist' });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' });

    }
}   );

//get getUserData using id in req.body
router.post('/getUserData', async (req, res) => {
    const { id, token } = req.body;
    try {
        jwt.verify(token, SECRET_KEY, async (err) => {
            if (err) {
                return res.status(401).json({ message: 'Unauthorized' });
            } else {
                const admin = await Admin.findOne({ _id: id });
                if (!admin)
                    return res.status(404).json({ message: "User doesn't exist" });
                res.status(200).json({ result: admin, token: token });
            }
        });
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
                res.status(200).json({ result: form, message: 'Form successfully created !' });
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
    }
});

// Update form API endpoint
router.post('/updateForm', async (req, res) => {
    const { email, token, formObject } = req.body;
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

                res.status(200).json({ result: form, message: 'Form successfully updated !' });
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
    }
});


// api to get all forms of a particular admin
router.post('/getForms', async (req, res) => {
    const { email, token } = req.body;

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

//delete form
router.post('/deleteForm', async (req, res) => {
    const { form_id, admin_id, token } = req.body;
    console.log("form_id",form_id)
    try {
        jwt.verify(token, SECRET_KEY, async (err) => {
            if (err) {
                return res.status(401).json({ message: 'Unauthorized' });
            }

            const form = await Form.findOne({ form_id, admin_id });

            if (!form) {
                return res.status(404).json({ message: "Form doesn't exist" });
            }

            await form.deleteOne();

            return res.status(200).json({ message: 'Form deleted successfully' });
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});



//api to change password using token and email

router.post('/changePassword', async (req, res) => {
    const { email, token, password, currentPassword } = req.body;
    try {
        jwt.verify(token, SECRET_KEY, async (err) => {
            if (err) {
                return res.status(401).json({ message: 'Unauthorized' });
            } else {
                const admin = await Admin.findOne({ email });
                if (!admin) {
                    return res.status(404).json({ message: 'Admin not found' });
                }

                // Compare the current password with the hashed password in the database
                const isMatch = await bcrypt.compare(currentPassword, admin.password);
                if (!isMatch) {
                    return res.status(401).json({ message: 'Current password is incorrect' });
                }

                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(password, salt);

                // Update the password in the database
                await Admin.findOneAndUpdate({ email }, { password: hashedPassword });

                return res.status(200).json({ message: 'Password changed successfully' });
            }
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});


//api to reset password using email and newpassword
router.post('/resetPassword', async (req, res) => {
    const { email, newpassword } = req.body;
    try {

        const admin = await Admin.findOne({ email });
        if (!admin) {
            return res.status(404).json({ message: 'Admin not found' });
        }
        // Compare the current password with the hashed password in the database
       const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newpassword, salt);
        // Update the password in the database
        await Admin.findOneAndUpdate({ email }, { password: hashedPassword });

        return res.status(200).json({ message: 'Password changed successfully' });


} catch (error)
{
    console.error(error);
    return res.status(500).json({message: 'Internal Server Error'});
}
});

router.post('/getFormById', async (req, res) => {
    const { form_id, token } = req.body;
    try {
        jwt.verify(token, SECRET_KEY, async (err) => {
            if (err) {
                return res.status(401).json({ message: 'Unauthorized' });
            } else {
                const form = await Form.findOne({ "form_id": form_id });
                if (!form)
                    return res.status(404).json({ message: "Form doesn't exist" });
                res.status(200).json({ form: form });
            }
        });
    } catch (e) {
        return res.status(500).json({ message: 'Something went wrong' });
    }
});


router.post("/sendOTP", async (req, res) => {
    try {
        const { email } = req.body;
        const otp = helper.generateOTP();
        if (!otp)
            throw new Error('OTP generation failed');
        const result = await axios.post("https://script.google.com/macros/s/AKfycbxyhUYYyRXeHLXmkXwuAHeqwrGuxvI_xmlLDZ15S4bTOCw8qUVh-fFFb6q4kUwGDvlV/exec", {
            "email": email,
            "otp": otp,
            "msg": "Hello, " + email + " your OTP is " + otp + " ." + " Thank you for using our service."
        })
        res.status(200).json({ otp: otp, message: "OTP sent successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

module.exports = router;

