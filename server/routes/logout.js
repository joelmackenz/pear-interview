const express = require("express");
const router = express.Router();
const auth = require("../middleware/authenticateJWT");

router.get("/", auth, async (req, res) => {
  res.clearCookie("token");
  res.json({
    user: { firstName: "", lastName: "", email: "" },
  });
});

module.exports = router;
