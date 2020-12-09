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
}
