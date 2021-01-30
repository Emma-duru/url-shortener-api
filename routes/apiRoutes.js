const router = require("express").Router();
const {
  shorten_url_post,
  route_redirect_get,
} = require("../controllers/apiControllers");

router.post("/", shorten_url_post);
router.get("/:route", route_redirect_get);

module.exports = router;
