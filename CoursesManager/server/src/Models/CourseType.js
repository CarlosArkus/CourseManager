const { Schema, model } = require('mongoose');

const CourseTypeSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
  versionKey: false,
});

module.exports = model('CourseType', CourseTypeSchema);