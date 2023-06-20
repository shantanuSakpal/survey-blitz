const express = require('express');
const _ = require('lodash');
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
    Admin.findOne({email}).then((admin) => {
        if (admin) {
            return res.status(405).json({error: "Admin already exists"});
        }
    }).catch((err) => {
        return res.status(500).json({error: err});
    });
    Admin.create({email, password}).then((admin) => {
        return res.status(200).json({admin});
    }
    ).catch((err) => {
        return res.status(500).json({error: err});
    });
})
.post('/addForm', (req, res) => {
    const { email, formObject } = req.body;
    console.log("email", email);
    var formattedName = _.kebabCase(formObject.form_name)
    Admin.findOne({ email }) // Find admin document by email
    .then((admin) => {
        if (admin) {
            formObject.url = "/" + admin._id + '/' + formattedName;
            console.log("formobject", formObject);
            // Push the form object to the admin's formObject array
                admin.formObjectsArray.push(formObject);
                admin.save();
                return res.status(200).json({ admin });
            } else {
                return res.status(405).json({ error: "Admin not found" });
            }
        })
        .catch((err) => {
            return res.status(500).json({ error: err });
        });
})


// get all forms of a particular admin
.get('/getForms', (req, res) => {
    const { email } = req.query;

    Admin.findOne({ email })
        .then((admin) => {
            if (admin){
                return res.status(200).json({ forms: admin.formObjectsArray });
            } else {
                return res.status(404).json({ error: "Admin not found" });
            }
        })
        .catch((err) => {
            return res.status(500).json({ error: err });
        });
});

// get request to get a specific form of a particular admin
router.get('/:id/:formName', (req, res) => {
    const { id, formName } = req.params;
    console.log("id", id);
    console.log("formName", formName);
    var url = "/" + id + "/" + formName;
    console.log("url", url);
    Admin.find({ "formObjectsArray.url": url }).then((admin) => {
        if (admin) {
            console.log("admin", admin);
            var formObject = admin[0].formObjectsArray.filter((form) => {
                return form.url === url;
            });
            console.log("formObject", formObject);
            return res.status(200).json({ formObject });
        } else {
            return res.status(404).json({ error: "Admin not found" });
        }
    }).catch((err) => {
        return res.status(500).json({ error: err });
    });
});


module.exports = router;
