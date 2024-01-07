import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";

import prismaInstance from "../../prisma/prismaClient.js";

const ACCESS_TOKEN_VALIDITY = "15m";
const REFRESH_TOKEN_VALIDITY = "1d";
const COOKIE_MAX_AGE = 7 * 24 * 60 * 60 * 1000;

// @desc    Login
// @route   POST /auth
// @access  Public
const login = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  // @func  Check for empty field(s)
  if (!username || !password) {
    return res.status(400).json({ message: "Missing credential(s)." });
  }

  // @func  Find and validate user
  const user = await prismaInstance.user.findUnique({
    where: { username },
    select: {
      id: true,
      username: true,
      password: true,
      isActive: true,
      role: true,
    },
  });

  if (!user || !user.isActive) {
    return res.status(401).json({ message: "Invalid credentials." });
  }

  // @func  Compare and validate password
  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    return res.status(401).json({ message: "Incorrect Username or Password." });
  }

  // @func  Create tokens
  const accessToken = jwt.sign(
    {
      UserData: {
        userId: user.id,
        username: user.username,
        roles: user.role.roleName,
      },
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: ACCESS_TOKEN_VALIDITY }
  );

  const refreshToken = jwt.sign(
    { username },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: REFRESH_TOKEN_VALIDITY }
  );

  // @func  Create cookies
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true, // accessible only by web server
    // secure: true, //https
    // sameSite: "None", // cross-site cookie
    maxAge: COOKIE_MAX_AGE, //cookie expire: set to match 'refreshToken'
  });

  res.json({ accessToken });
});

// @desc    Refresh token
// @route   POST /auth/refresh
// @access  Public
const refresh = (req, res) => {
  const { cookies } = req;
  console.log(cookies);
  if (!cookies?.refreshToken) {
    return res.status(401).json({ message: "Unauthorized." });
  }

  jwt.verify(
    cookies.refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    asyncHandler(async (err, decoded) => {
      if (err) {
        return res
          .status(401)
          .json({ message: `Unauthorized. ${err?.message}` });
      }
      console.log(decoded);

      // @func    Validate user
      const user = await prismaInstance.user.findUnique({
        where: { username: decoded.username },
        select: { id: true, username: true, role: true },
      });

      if (!user) {
        return res.status(401).json({ message: `Unauthorized. USR 404` });
      }
      // @func  Create tokens
      const accessToken = jwt.sign(
        {
          UserData: {
            userId: user.id,
            username: user.username,
            roles: user.role.roleName,
          },
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: ACCESS_TOKEN_VALIDITY }
      );

      res.json({ accessToken });
    })
  );
};

// @desc    Clear cookie
// @route   POST /auth
// @access  Public
const logout = (req, res) => {
  const { cookies } = req;

  if (!cookies?.refreshToken) return res.sendStatus(204); // No content

  res.clearCookie("refreshToken", {
    httpOnly: true, // accessible only by web server
    // secure: true, //https
    // sameSite: "None", // cross-site cookie
  });

  res.json({ message: "Cookie cleared." });
};

export { login, refresh, logout };
