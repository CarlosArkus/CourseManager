const { Schema, model } = require('mongoose');

const CourseSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  url: {
    type: String,
  },
  description: {
    type: String,
    required: true,
  },
  courseType: {
    type: String,
    required: true,
  }
}, {
  timestamps: true,
  versionKey: false,
});

module.exports = model('Course', CourseSchema);