const jwt = require("jsonwebtoken");

module.exports = {
  createToken: function (payload) {
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "2 days",
    });
    return token;
  },
};
