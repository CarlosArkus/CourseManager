const User = require('../Models/User');
const generateToken = require('../Helpers/jwt');
const logger = require('../utilities/logger');

exports.signUp = async (req, res) => {
  const { email, password } = req.body;

  try {
    const emailFound = await User.findOne({ email });
    if (emailFound) {
      return res.status(400).json({
        ok: false,
        message: 'Email already exists'
      });
    }

    const user = new User(req.body);
    user.password = await user.encryptPassword(password);
    await user.save();

    res.status(201).json({
      ok: true,
      user
    });
  } catch (error) {
    logger.log('error', error.message);
    res.status(500).json({
      ok: false,
      message: 'Something went wrong'
    });
  }
}

exports.signIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      logger.info('Not user found');
      return res.status(400).json({
        ok: false,
        message: 'Email or password is wrong'
      });
    }

    const validPassword = await user.validatePassword(password);
    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        message: 'Email or password is wrong'
      });
    }

    const token = await generateToken(user.id);

    res
      .status(200)
      .header('auth-token', token)
      .json({
        ok: true,
        message: 'User loged in',
        token,
        userId: user.id
      });
  } catch (error) {
    logger.error(error.message);
    res.status(500).json({
      ok: false,
      message: 'Something went wrong'
    })
  }

}
