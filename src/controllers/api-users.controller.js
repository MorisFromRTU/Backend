const { Router } = require("express");
const Token = require("../dataBase/models/Token.model");
const User = require("../dataBase/models/User.model");
const { asyncHandler, requireToken } = require("../middlewares/middlewares");

const router = Router();

function initRoutes() {
  router.get("/info", asyncHandler(requireToken), asyncHandler(info));
  router.patch(
    "/updateinfo",
    asyncHandler(requireToken),
    asyncHandler(updateinfo)
  );
  router.post("/logout", asyncHandler(requireToken), asyncHandler(logout));
}

async function info(req, res, next) {
  const info = await User.findByPk(req.userId);
  res.status(200).json(info);
}

async function updateinfo(req, res, next) {
  let userinfo = await User.findByPk(req.userId);
  userinfo = await userinfo.update(req.body);
  res.status(200).json(userinfo);
}

async function logout(req, res, next) {
  await Token.destroy({
    where: {
      value: req.header("x-access-token")
    },
  });
  res.status(200).json({message: "You are logged out of your account.."});
}

initRoutes();

module.exports = router;
