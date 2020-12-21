const { Schema, model, Types } = require('mongoose');

const UserCourseSchema = new Schema({
  user: {
    required: true,
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  courseTime: {
    type: Number,
    required: true,
  },
  courseID: {
    type: Types.ObjectId,
    required: true,
  },
  courseName: {
    type: String,
    required: true,
  },
  courseURL: {
    type: String,
  },
  courseDescription: {
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

UserCourseSchema.methods.toJSON = function() {
  const obj = this.toObject();
  delete obj.createdAt;
  delete obj.updatedAt;
  return obj
}

module.exports = model('UserCourse', UserCourseSchema);
