const verifyUserId = (req, res, next) => {
  const allowedRoles = ["ADMIN"];
  const userId = req.userId;
  const role = req.roles;
  if (userId != req.params.userId && !allowedRoles.includes(role)) {
    return res.status(401).json({ message: "Unauthorized." });
  }
  next();
};

export default verifyUserId;
