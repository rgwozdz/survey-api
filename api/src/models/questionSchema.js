'use strict';
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-beautiful-unique-validation');
const Schema = mongoose.Schema;

const questionSchema = Schema({
  label : { type: String, required: true, unique: true },
  index : {type: Number, required: true, unique: true},
  answers: [{type:String, required: true, unique: true }],
}, {
  strict: true,
  timestamps: {createdAt: 'created', updatedAt: 'updated' }
});

questionSchema.plugin(uniqueValidator);

module.exports = questionSchema;

