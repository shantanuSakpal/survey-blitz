const express = require("express");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Admin = require("../models/admin");
const Form = require("../models/form");
const Response = require("../models/response");
require("dotenv").config();

const router = express.Router();

const SECRET_KEY = process.env.SECRET_KEY;

router.post("/getFormQuestions", async (req, res) => {
  const { admin_id, form_url } = req.body;
  try {
    const form = await Form.findOne({
      form_url: form_url,
    });
    if (!form) return res.status(404).json({ message: "Form doesnt exist" });
    res.status(200).json({ result: form });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
});
router.get("/getUserResponse/:userId", async (req, res) => {
  const userId = req.params.userId;

  try {
    const userResponse = await Response.findOne({ user_id: userId });
    if (userResponse) {
      res.json(userResponse);
    } else {
      res.json({ success: false, message: "User form not found" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

//api to get form responses of a form from form id

router.post("/getFormResponses/:formId", async (req, res) => {
  const { formId, token, userId } = req.body;
  try {
    //authentication
    jwt.verify(token, SECRET_KEY, async (err) => {
      if (err) {
        return res.status(401).json({ message: "Unauthorized" });
      } else {
        const admin = await Admin.findOne({ _id: userId });
        if (!admin)
          return res.status(404).json({ message: "User doesn't exist" });
        const responses = await Response.find({ form_id: formId });
        res.status(200).json({ responses: responses });
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
});

router.post("/saveResponse", async (req, res) => {
  const { user_id, formObject } = req.body;
  try {
    const response = new Response({
      user_id,
      formObject,
      form_id: formObject.form_id,
    });
    await response.save();
    res
      .status(201)
      .json({ result: response, message: "Response successfully saved !" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong, please try again later." });
  }
});

module.exports = router;
