const Course = require('../Models/Course');

exports.getCourses = async (req, res) => {
  try {
    const data = await Course.find();
    res.status(200).json({ ok: true, data });
    
  } catch (error) {
    logger.error(error.message);
    res.status(500).json({
      ok: false,
      message: 'Something went wrong'
    });
  }
}
