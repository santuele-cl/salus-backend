const verifyUserId = (req, res, next) => {
  const allowedRoles = ["admin"];

  const userId = req.userId;
  const role = req.roles;

  if (userId != req.params.userId && !allowedRoles.includes(role)) {
    return res.status(401).json({ message: "sUnauthorized." });
  }

  next();
};

export default verifyUserId;
