const router = require("express").Router();
const Secret = require("../model/secret");
const auth = require("../middlewares/verifyToken");

router.get("/", (req, res) => {
  Secret.find()
    .select("-__v")
    .populate("owner", "name email")
    .then((secret) => {
      if (!secret.length) return res.json({ msg: "No available secret yet" });
      res.send(secret);
    })
    .catch((error) => {
      throw error;
    });
});

router.post("/", auth, (req, res) => {
  const { content } = req.body;
  if (!content) return res.status(400).json({ msg: "Field Cannot be empty" });
  const newSecret = new Secret({
    content,
    owner: req.user.id,
  });

  newSecret
    .save()
    .then((secret) => {
      res.send(secret);
    })
    .catch((error) => {
      throw error;
    });
});

module.exports = router;
