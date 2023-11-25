import jwt from "jsonwebtoken";

const testMiddleware = (req, res, next) => {
  console.log("test middle");
  next();
};

export default testMiddleware;
