const express = require("express");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Admin = require("../models/admin");
const jwt_decode = require("jwt-decode");
const Form = require("../models/form");
const { generateOTP } = require("../helpers/helper");
const router = express.Router();
const axios = require("axios");
require("dotenv").config();

const SECRET_KEY = process.env.SECRET_KEY;
const GOOGLE_SCRIPT_FOR_OTP = process.env.GOOGLE_SCRIPT_FOR_OTP;

const emailIsValid = require("../helpers/helper").emailIsValid;
const passwordIsValid = require("../helpers/helper").passwordIsValid;

// signUp route
router.post("/signUp", async (req, res) => {
  const { email, password, username } = req.body;

  if (!emailIsValid(email))
    return res.status(400).send({ message: "Invalid email" });

  if (!passwordIsValid(password))
    return res
      .status(400)
      .send({ message: "Password must be at least 6 characters" });

  try {
    const existingUser = await Admin.findOne({ email });
    if (existingUser)
      return res.status(400).send({ message: "User already exists" });
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

router.post("/signUpWithGoogle", async (req, res) => {
  const { jwtToken } = req.body;
  try {
    const userObject = jwt_decode(jwtToken);
    const { email, given_name, picture } = userObject;
    const existingUser = await Admin.findOne({ email });
    if (existingUser) {
      const token = jwt.sign(
        { email: existingUser.email, id: existingUser._id },
        SECRET_KEY
      );
      return res.status(200).json({ result: existingUser, token: token });
    }
    const admin = await Admin.create({
      email,
      username: given_name,
      profilePicture: picture,
    });
    const token = jwt.sign({ email: admin.email, id: admin._id }, SECRET_KEY);
    res.status(200).json({ result: admin, token: token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/signIn", async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await Admin.findOne({ email });
    if (!existingUser) {
      return res.status(404).json({ message: "User doesn't exist" });
    }

    // Check if the user has a password property in the database
    if (!existingUser.password) {
      return res
        .status(401)
        .json({ message: "You signed up with Google. Sign in with Google." });
    }

    // Verify the provided password
    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      SECRET_KEY
    );
    res.status(200).json({ result: existingUser, token: token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
});

//check if user already exists
router.post("/checkUser", async (req, res) => {
  const { email } = req.body;
  try {
    if (!emailIsValid(email))
      return res.status(400).send({ message: "Invalid email" });
    const existingUser = await Admin.findOne({ email });
    if (existingUser)
      return res.status(401).send({ message: "User already exists" });
    res.status(200).json({ message: "User does not exist" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
});

//get getUserData using id in req.body
router.post("/getUserData", async (req, res) => {
  const { id, token } = req.body;
  try {
    jwt.verify(token, SECRET_KEY, async (err) => {
      if (err) {
        return res.status(401).json({ message: "Unauthorized" });
      } else {
        const admin = await Admin.findOne({ _id: id });
        if (!admin)
          return res.status(404).json({ message: "User doesn't exist" });
        res.status(200).json({ result: admin, token: token });
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
});

router.post("/createForm", async (req, res) => {
  const { email, token, formObject } = req.body;
  try {
    jwt.verify(token, SECRET_KEY, async (err) => {
      if (err) {
        return res.status(401).json({ message: "Unauthorized" });
      } else {
        const admin = await Admin.findOne({ email });
        if (!admin)
          return res.status(404).json({ message: "User doesn't exist" });

        // Check if a form with the same name already exists for the admin

        // if (existingForm) {
        //   return res
        //     .status(403)
        //     .json({ message: "Something went wrong. Please try again." });
        // }

        admin.form_id.push(formObject.form_id);
        await admin.save();

        const form = await Form.create({
          admin_id: admin._id,
          form_id: formObject.form_id,
          formObject: formObject,
          form_url: formObject.form_url,
          is_active: formObject.is_active,
          deleted: 0,
        });
        res
          .status(200)
          .json({ result: form, message: "Form successfully created !" });
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
});

//api to publish form using form_id and admin_id
router.post("/publishForm", async (req, res) => {
  const { form_id, admin_id, formObject, token } = req.body;
  try {
    jwt.verify(token, SECRET_KEY, async (err) => {
      if (err) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const form = await Form.findOne({ form_id, admin_id });

      if (!form) {
        return res.status(404).json({ message: "Form doesn't exist" });
      }

      // Update the formObject with the new formObject
      form.formObject = formObject;
      form.is_active = true;
      form.formObject.is_active = true;
      form.form_url = formObject.form_url;
      await form.save();

      return res.status(200).json({ message: "Form published successfully" });
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

//soft save
router.post("/saveChanges", async (req, res) => {
  console.log("saving");
  const { form_id, admin_id, formObject, token } = req.body;
  try {
    jwt.verify(token, SECRET_KEY, async (err) => {
      if (err) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const form = await Form.findOne({ form_id, admin_id });

      if (!form) {
        return res.status(404).json({ message: "Form doesn't exist" });
      }

      // Update the formObject with the new formObject
      form.formObject = formObject;
      await form.save();

      return res.status(200).json({ message: "Changes saved" });
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

// api to get all forms of a particular admin
router.post("/getForms", async (req, res) => {
  const { email, token } = req.body;

  try {
    jwt.verify(token, SECRET_KEY, async (err) => {
      if (err) {
        return res.status(401).json({ message: "Unauthorized" });
      } else {
        const admin = await Admin.findOne({ email });
        if (!admin)
          return res.status(404).json({ message: "User doesn't exist" });
        const forms = await Form.find({ admin_id: admin._id });
        res.status(200).json({ forms: forms });
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
});

//delete form

router.post("/deleteForm", async (req, res) => {
  const { form_id, admin_id, token } = req.body;
  try {
    jwt.verify(token, SECRET_KEY, async (err) => {
      if (err) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const form = await Form.findOne({ form_id, admin_id });

      if (!form) {
        return res.status(404).json({ message: "Form doesn't exist" });
      }

      // Update the 'deleted' field in the formObject to 1

      form.deleted = 1;

      // Save the updated form document
      await form.save();

      return res
        .status(200)
        .json({ message: "Form marked as deleted successfully" });
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

//change status

router.post("/changeStatus", async (req, res) => {
  const { form_id, admin_id, token, status } = req.body;
  try {
    jwt.verify(token, SECRET_KEY, async (err) => {
      if (err) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const form = await Form.findOne({ form_id, admin_id });

      if (!form) {
        return res.status(404).json({ message: "Form doesn't exist" });
      }

      // Update the 'is_active' field in the formObject to the desired status
      form.formObject.is_active = status;
      form.is_active = status;

      // Save the updated form document
      await form.save();

      return res.status(200).json({ message: "Form status change successful" });
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

//api to change password using token and email

router.post("/changePassword", async (req, res) => {
  const { email, token, password, currentPassword } = req.body;
  try {
    jwt.verify(token, SECRET_KEY, async (err) => {
      if (err) {
        return res.status(401).json({ message: "Unauthorized" });
      } else {
        const admin = await Admin.findOne({ email });
        if (!admin) {
          return res.status(404).json({ message: "Admin not found" });
        }

        // Compare the current password with the hashed password in the database
        const isMatch = await bcrypt.compare(currentPassword, admin.password);
        if (!isMatch) {
          return res
            .status(401)
            .json({ message: "Current password is incorrect" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Update the password in the database
        await Admin.findOneAndUpdate({ email }, { password: hashedPassword });

        return res
          .status(200)
          .json({ message: "Password changed successfully" });
      }
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

//api to reset password using email and newpassword
router.post("/resetPassword", async (req, res) => {
  const { email, newpassword } = req.body;
  try {
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }
    // Compare the current password with the hashed password in the database
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newpassword, salt);
    // Update the password in the database
    await Admin.findOneAndUpdate({ email }, { password: hashedPassword });

    return res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/getFormById", async (req, res) => {
  const { form_id, token } = req.body;
  try {
    jwt.verify(token, SECRET_KEY, async (err) => {
      if (err) {
        return res.status(401).json({ message: "Unauthorized" });
      } else {
        const form = await Form.findOne({ form_id: form_id });
        if (!form)
          return res.status(404).json({ message: "Form doesn't exist" });
        res.status(200).json({ form: form });
      }
    });
  } catch (e) {
    return res.status(500).json({ message: "Something went wrong" });
  }
});

router.post("/sendOTP", async (req, res) => {
  try {
    const { email } = req.body;
    const otp = generateOTP();

    if (!otp) throw new Error("OTP generation failed");

    const postBody = {
      email: email,
      otp: otp,
    };

    const response = await fetch(GOOGLE_SCRIPT_FOR_OTP, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postBody),
    });
    res.status(200).json({ otp: otp, message: "OTP sent successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
