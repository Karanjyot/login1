const db = require("../models");
const path = require("path");
module.exports = function(app) {
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/signup.html"));
  });
  app.get("/login", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/login.html"));
  });
  app.get("/dashboard", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });

  app.post("/", function(req, res) {
    db.User.create({
      email: req.body.email,
      password: req.body.password
    }).then(function() {
      res.redirect("/dashboard");
    });
  });

  app.post("/login", function(req, res) {
    db.User.findOne({
      where: {
        email: req.body.email,
        password: req.body.password
      }
    }).then(function(response) {
      if (!response) {
        res.redirect("/");
      } else {
        res.redirect("/dashboard");
      }
    });
  });
};