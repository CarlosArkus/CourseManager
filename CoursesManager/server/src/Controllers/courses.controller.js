const Course = require('../Models/Course');

exports.getCourses = async (req, res) => {
  try {
    const data = await Course.find();
    res.status(200).json({ ok: true, data });
    
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      message: 'Something went wrong'
    });
  }
}
