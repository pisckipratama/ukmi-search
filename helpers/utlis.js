const helpers = {
  isLoggedIn: (req, res, next) => {
    if (req.session.nim) {
      next();
    } else {
      res.redirect("/");
    }
  }
}

module.exports = helpers;