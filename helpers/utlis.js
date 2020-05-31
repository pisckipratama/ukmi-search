const helpers = {
  isLoggedIn: (req, res, next) => {
    if (req.session.user) {
      next();
    } else {
      res.redirect("/");
    }
  },
  isLoggedInAdmin: (req, res, next) => {
    if (req.session.user) {
      next();
    } else {
      res.redirect("/panel");
    }
  }
}

module.exports = helpers;