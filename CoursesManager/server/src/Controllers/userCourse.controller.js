const Course = require('../Models/Course');
const UserCourse = require('../Models/UserCourse');
const logger = require('../utilities/logger');

//TODO: pagination
exports.getUsersCourses = async (req, res) => {
  try {
    // const data = await User.find().populate({
    //   path: 'userCourses',
    //   select: 'time courseID course'
    // });
    const data = await UserCourse.find().populate({ path: 'user', select: 'name' });
    // const data = await UserCourse.find();
    res.status(200).json({
      ok: true,
      data
    });
  } catch (error) {
    logger.error(error.message);
    res.status(500).json({
      ok: false,
      message: 'Something went wrong'
    });
  }
}

exports.addUserCourse = async (req, res) => {
  try {
    const { courseID, time } = req.body;
    const user = req.uid;
    const course = await Course.findById(courseID);

    if (!course) {
      return res.status(400).json({
        ok: true,
        message: 'A course with that name does not exist'
      })
    }

    const { name: courseName, url: courseURL, description: courseDescription, courseType } = course;

    const userCourse = new UserCourse({
      user,
      courseTime: time,
      courseID,
      courseName,
      courseURL,
      courseDescription,
      courseType,
    });

    const userCourseDB = await userCourse.save(userCourse);

    res.status(201).json({
      ok: true,
      userCourse: userCourseDB
    });

  } catch (error) {
    logger.error(error.message);
    res.status(500).json({
      ok: false,
      message: 'Something went wrong'
    });
  }
}

exports.updateUserCourse = async (req, res) => {
  try {
    const user = req.uid;
    const { time, courseID, userCourseId } = req.body;

    const userCourse = await UserCourse.findById(userCourseId);

    if (!userCourse) {
      return res.status(404).json({
        ok: false,
        message: 'User course not founded'
      })
    }

    const course = await Course.findById(courseID);
    if (!course) {
      return res.status(404).json({
        ok: false,
        message: 'A course with that name does not exist'
      })
    }

    const { name, url, description, courseType } = course;
    const userCourseChange = {
      user,
      courseTime: time,
      courseID,
      courseName: name,
      courseURL: url,
      courseDescription: description,
      courseType
    }

    const updatedUserCourse = await UserCourse.findByIdAndUpdate(userCourseId, userCourseChange, { new: true });

    res.status(200).json({
      ok: true,
      newUserCourse: updatedUserCourse
    });

  } catch (error) {
    logger.error(error.message);
    res.status(500).json({
      ok: false,
      message: 'Something went wrong'
    });
  }
}

exports.deleteUserCourse = async (req, res) => {
  try {
    const id = req.params.id;
    const userCourse = await UserCourse.findById(id);

    if (!userCourse) {
      return res.status(404).json({
        ok: false,
        message: 'Course not founded'
      })
    }

    await UserCourse.findByIdAndDelete(id);

    res.status(200).json({
      ok: true,
      message: 'Course deleted'
    });

  } catch (error) {
    logger.error(error.message);
    res.status(500).json({
      ok: false,
      message: 'Something went wrong'
    });
  }
}
