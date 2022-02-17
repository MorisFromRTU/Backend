const { Router } = require("express");
const ErrorResponse = require("../classes/error-response");
const { nanoid } = require("nanoid");
const Token = require("../dataBase/models/Token.model");
const User = require("../dataBase/models/User.model");
const { asyncHandler } = require("../middlewares/middlewares");

const router = Router();

function initRoutes() {
  router.post("/registration", asyncHandler(registration));
  router.post("/authorization", asyncHandler(authorization));
}

async function registration(req, res, next) {
  const isUser = await User.findOne({
    where: {
      email: req.body.email,
    },
  });
  if (isUser) {
    throw new ErrorResponse("This email is already registrated..", 400);
  }
  const newUser = await User.create(req.body);
  res.status(200).json(newUser);
}

async function authorization(req, res, next) {
  const findUser = await User.findOne({
    where: {
      email: req.body.email,
      password: req.body.password,
    },
  });
  if (!findUser) {
    throw new ErrorResponse("Incorrect email or password..", 401);
  }
  const newToken = await Token.create({
    userId: findUser.id,
    value: nanoid(128),
  });
  res.status(200).json({
    token: newToken.value,
  });
}

initRoutes();

module.exports = router;
