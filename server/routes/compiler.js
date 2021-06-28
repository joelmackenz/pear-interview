const express = require("express");
const router = express.Router();
const axios = require("axios");

router.post("/:language", async (req, res, next) => {
  const tempFiles = req.body.files;
  const language = req.params.language;

  if (!["javascript", "python", "java"].includes(language)) {
    res.send("invalid language");
  } else {
    try {
      const response = await axios.post(
        `https://glot.io/api/run/${language}/latest`,
        { files: tempFiles },
        {
          headers: {
            Authorization: process.env.GLOT_KEY,
            "Content-Type": "application/json",
          },
        }
      );
      res.json(response.data);
    } catch (err) {
      console.error(err);
      res.send(err);
    }
  }
});

module.exports = router;
