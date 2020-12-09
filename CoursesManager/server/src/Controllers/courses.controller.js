const Course = require('../Models/Course');

exports.getCourses = async (req, res) => {
  try {
    const data = await Course.find();
    res.status(200).json({
      ok: true,
      data
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      message: 'Something went wrong'
    });
  }
}

exports.addCourse = async (req, res) => {
  try {
    const course = new Course(req.body);
    course.save();
    res.status(201).json({
      ok: true,
      course
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      message: 'Something went wrong'
    });
  }
  res.status(200).json({ ok: true, message: 'adding course' });
}


exports.deleteCourses = async (req, res) => {
  res.status(200).json({ ok: true, message: 'deleting course' });
}

exports.updateCourse = async (req, res) => {
  res.status(200).json({ ok: true, message: 'updating course' });
}
