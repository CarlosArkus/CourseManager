const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
  versionKey: false,
});

UserSchema.virtual('userCourses', {
  ref: 'UserCourse',
  localField: '_id',
  foreignField: 'user'
});

UserSchema.set('toObject', { virtuals: true });
UserSchema.set('toJSON', { virtuals: true });

UserSchema.methods.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt();
  return bcrypt.hash(password, salt);
}

UserSchema.methods.validatePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
}

module.exports = model('User', UserSchema);