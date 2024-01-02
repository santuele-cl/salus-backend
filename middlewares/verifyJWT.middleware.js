import jwt from "jsonwebtoken";

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;

  console.log(authHeader, !authHeader?.startsWith("Bearer "));

  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorizedssss." });
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: `Unauthorizeddd.` });
    }
    console.log(decoded);

    req.userId = decoded.UserData.userId;
    req.user = decoded.UserData.username;
    req.roles = decoded.UserData.roles;
    next();
  });

  // NOTES: For testing only!
  // next();
};

export default verifyJWT;
