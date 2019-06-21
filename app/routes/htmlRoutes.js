// Full Documentation - https://www.turbo360.co/docs
const turbo = require("turbo360")({ site_id: process.env.TURBO_APP_ID });
const vertex = require("vertex360")({ site_id: process.env.TURBO_APP_ID });
const router = vertex.router();
var path = require("path");

/*  This is the home route. It renders the index.mustache page from the views directory.
	Data is rendered using the Mustache templating engine. For more
	information, view here: https://mustache.github.io/#demo */
router.get("/", (req, res) => {
  res.render("index");
});

/*  This route render json data */
router.get("/survey", (req, res) => {
  res.sendFile(path.join(__dirname, "/../public/survey.html"));
});

const profiles = require("../data/friend.js");

router.get("/profiles", (req, res) => {
  const keys = Object.keys(profiles);
  const list = [];
  keys.forEach(key => {
    list.push(profiles[key]);
  });
  const timestamp = new Date();

  const data = {
    timestamp: timestamp.toString(),
    profiles: list
  };
  res.render("profiles", data);
});
//===============================================================
//				 PROFILE/username
//===============================================================
//2 params, add as many
router.get("/profile/:username", (req, res) => {
  const profile = req.params.profile;
  const username = req.params.username;
  const currentProfile = profiles[username];
  if (currentProfile == null) {
    res.json({
      confirmation: "fail",
      message: `Hey! Profile ${username} not found`
    });
    return;
  }
  const timestamp = new Date();
  currentProfile.timestamp = timestamp.toString();
  res.render("profile", currentProfile);
});
//===============================================================
//				ADD PROFILE
//===============================================================
router.post("/addprofile", (req, res) => {
  const body = req.body;
  //   const languages = req.body.languages.split(", ")
  //render languages as an array
  body["languages"] = req.body.languages.split(", ");

  profiles[body.username] = body;
  res.redirect("/profile/" + body.username);
});

/*  This route sends text back as plain text. */
router.get("/send", (req, res) => {
  res.send("This is the Send Route");
});

//a GET route that displays JSON of all possible friends
router.get("/api/friends", function(req, res) {
  res.json(profiles);
});
/*  This route redirects requests to Turbo360. */
router.get("/redirect", (req, res) => {
  res.redirect("https://www.turbo360.co/landing");
});

// fallback use route for homepage
router.use(function(req, res) {
  res.sendFile(path.join(__dirname, "/../public/home.html"));
});

module.exports = router;
