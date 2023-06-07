const express = require('express');
const Admin = require('../models/admin');

const router = express.Router();

router
.post('/signin', (req, res) => {
    const {email, password} = req.body;
    Admin.findOne({email, password}).then((admin) => {
        if (admin) {
            return res.status(200).json({admin});
        }
        else{
            Admin.create({email, password}).then((admin) => {
                return res.status(200).json({admin});
            }).catch((err) => {
                return res.status(500).json({error: err});
            })
        }
    }
    ).catch((err) => {
        return res.status(500).json({error: err});
    });
})
.post('/signup', (req, res) => {
    const {email, password} = req.body;
    Admin.create({email, password}).then((admin) => {   
        return res.status(200).json({admin});
    }
    ).catch((err) => {
        return res.status(500).json({error: err});
    });
})

module.exports = router;
