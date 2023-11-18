export const verifyRole = (allowedRoles) => {
  return (req, res, next) => {
    const { roles } = req;

    const isAllowedToAccess = roles.some((role) => allowedRoles.includes(role));
    if (isAllowedToAccess) {
      next();
    } else {
      res.status(403).json({ message: "Forbidden." });
    }
  };
};
