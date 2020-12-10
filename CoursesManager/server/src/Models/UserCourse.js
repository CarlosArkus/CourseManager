const { Schema, model, Types } = require('mongoose');

const UserCourseSchema = new Schema({
  user: {
    required: true,
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  time: {
    type: Number,
    required: true,
  },
  courseID: {
    type: Types.ObjectId,
    required: true,
  },
  course: {
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
  },
}, {
  timestamps: true,
  versionKey: false,
});

module.exports = model('UserCourse', UserCourseSchema);