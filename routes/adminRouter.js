const express = require('express');
const Admin = require('../models/admin');

const router = express.Router();

router
.post('/', (req, res) => {
    Admin.find({}).then((admins) => {
        return res.status(200).json({admins});
    }
    ).catch((err) => {
        return res.status(500).json({error: err});
    });
})
.post('/signIn', (req, res) => {
    const {email, password} = req.body;
    console.log({email, password});
    Admin.findOne({email, password}).then((admin) => {
        if (admin) {
            return res.status(200).json({admin});
        }
        else{
            return res.status(404).json({error: "Admin not found"});
        }
    }
    ).catch((err) => {
        return res.status(500).json({error: err});
    });
})
.post('/signUp', (req, res) => {
    const {email, password} = req.body;
    Admin.create({email, password}).then((admin) => {   
        return res.status(200).json({admin});
    }
    ).catch((err) => {
        return res.status(500).json({error: err});
    });
})
.post('/addForm', (req, res) => {
    const {email,formObject} = req.body;
    Admin.findOne({email}).then((admin) => {
        if (admin) {
            admin.formObject.push(formObject);
            admin.save();
            return res.status(200).json({admin});
        }
        else{
            return res.status(404).json({error: "Admin not found"});
        }
    }
    ).catch((err) => {
        return res.status(500).json({error: err});
    });
})
// get all forms of a particular admin
.get('/getForms', (req, res) => {
    const {email} = req.body;
    Admin.findOne({email}).then((admin) => {
        if (admin) {
            return res.status(200).json({forms: admin.formObject});
        }
        else{
            return res.status(404).json({error: "Admin not found"});
        }
    }
    ).catch((err) => {
        return res.status(500).json({error: err});
    });
})
module.exports = router;
