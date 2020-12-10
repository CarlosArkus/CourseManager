const User = require('../Models/User');
const generateToken = require('../Helpers/jwt');

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
    console.error('Error', error);
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
        message: 'User loged in'
      });
  } catch (error) {
    console.error('Error', error);
    res.status(500).json({
      ok: false,
      message: 'Something went wrong'
    })
  }

}
