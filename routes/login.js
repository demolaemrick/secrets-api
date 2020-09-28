const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../model/user");
const { loginValidationRules, validate } = require("../validation");
const auth = require("../middlewares/verifyToken");

router.post("/login", loginValidationRules(), validate, (req, res) => {

  const { email, password } = req.body;

  User.findOne({ email }, (err, existUser) => {
    if (err) throw err;
    if (!existUser) return res.status(400).json({ msg: "User not found" });

    bcrypt.compare(password, existUser.password).then((isMatch) => {
      if (!isMatch) return res.status(400).json("Invalid credentials");
      jwt.sign(
        { id: existUser._id },
        process.env.TOKEN_SECRET,
        { expiresIn: 3600 },
        (error, token) => {
          res.send({
            token,
            user: {
              id: existUser._id,
              name: existUser.name,
              email: existUser.email,
            },
          });
        }
      );
    });
  });
});

//  to keep user logged in all the time.
router.get("/user", auth, (req, res) => {
  User.findById(req.user.id)
    .select("-password")
    .then((user) => res.json(user));
});
module.exports = router;
