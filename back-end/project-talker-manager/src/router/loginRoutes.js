const express = require('express');
const { validateEmail,
  validatePassword } = require('../middlewares/validateLogin');
const generateToken = require('../helpers/token');

const router = express.Router();

router.post('/',
  validateEmail,
  validatePassword, async (_req, res) => {
  const token = generateToken();
  res.status(200).json({ token });
});

module.exports = router;