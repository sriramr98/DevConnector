const express = require("express");
const router = express.Router();

router.get("/test", (req, res) => {
  return res.json({
    msg: "POSTS WORK"
  });
});

module.exports = router;
