// Full Documentation - https://www.turbo360.co/docs
const turbo = require("turbo360")({ site_id: process.env.TURBO_APP_ID });
const vertex = require("vertex360")({ site_id: process.env.TURBO_APP_ID });
const router = vertex.router();
var path = require("path");
const profiles = require("../data/friend.js");

//a GET route that displays JSON of all possible friends
router.get("/api/friends", function(req, res) {
  res.json(profiles);
});

router.get("/:resource", function(req, res) {
  res.json({
    confirmation: "success",
    resource: req.params.resource,
    query: req.query // from the url query string
  });
});
/*  This is a sample API route. */

router.get("/:resource/:id", (req, res) => {
  res.json({
    confirmation: "success",
    resource: req.params.resource,
    id: req.params.id,
    query: req.query // from the url query string
  });
});

module.exports = router;
