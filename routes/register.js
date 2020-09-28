const router = require("express").Router();
const User = require("../model/user");
const bcrypt = require("bcrypt");

const { registerValidationRules, validate } = require("../validation");
const jwt = require("jsonwebtoken");

router.post("/register", registerValidationRules(), validate, (req, res) => {
  const { name, email, password } = req.body;

  User.findOne({ email }, (err, userExists) => {
    if (userExists) return res.status(400).send({ msg: "User Already Exists" });
    const newUser = new User({
      name,
      email,
      password,
    });

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser
          .save()
          .then((user) => {
            jwt.sign(
              { id: user._id },
              process.env.TOKEN_SECRET,
              { expiresIn: 3600 },
              (err, token) => {
                if (err) throw err;
                res.send({
                  token,
                  user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                  },
                });
              }
            );
          })
          .catch((error) => {
            res.status(400).send({ msg: "Registration Failed" });
          });
      });
    });
  });
});

module.exports = router;
