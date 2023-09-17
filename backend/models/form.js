const express = require("express");
const mongoose = require("mongoose");

const formSchema = new mongoose.Schema({
  admin_id: String,
  form_id: String,
  formObject: {
    form_id: Number,
    form_name: String,
    form_description: String,
    form_url: String,
    form_sections: Array,
    currSectionId: Number,
    currComponentId: Number,
    is_active: Boolean,
    theme:String,
  },
  form_url: String,
  is_active: Boolean,
  deleted: Number,
});

const Form = mongoose.model("Form", formSchema);
module.exports = Form;
