function setLocals(req, res, next) {
  res.locals.currentUser = req.user;
  res.locals.isClubmember = req.user?.clubmember || false;
  res.locals.isAdmin = req.user?.admin || false;
  next();
}

module.exports = setLocals;
