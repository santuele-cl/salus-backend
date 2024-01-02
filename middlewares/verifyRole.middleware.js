export const verifyRole = (allowedRoles) => {
  return (req, res, next) => {
    const { roles } = req;
    console.log(roles);
    const isAllowedToAccess = allowedRoles.includes(roles);

    if (isAllowedToAccess) {
      next();
    } else {
      res.status(403).json({ message: "Forbidden." });
    }
    // NOTES: For testing only!
    // next();
  };
};
