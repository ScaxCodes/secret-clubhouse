function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).render("unauthorized", {
    message: "You must be logged in to view this page.",
  });
}

function ensureAdmin(req, res, next) {
  if (req.isAuthenticated() && req.user?.admin) {
    return next();
  }
  res.status(403).render("unauthorized", { message: "Admin access only." });
}

module.exports = {
  ensureAuthenticated,
  ensureAdmin,
};
