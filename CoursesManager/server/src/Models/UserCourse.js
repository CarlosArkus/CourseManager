const { Schema, model } = require('mongoose');

const UserCourseSchema = new Schema({
  time: {
    type: Number,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  course: {
    type: Schema.Types.ObjectId,
    ref: 'Course',
  }
}, {
  timestamps: true,
  versionKey: false,
});

module.exports = model('UserCourse', UserCourseSchema);