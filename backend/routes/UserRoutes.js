const router = require("express").Router();
const UserController = require("../controllers/UserController");

const checkUser = require("../helpers/middleware/check-user");
const imageUpload = require("../helpers/image-upload");

router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.get("/checkuser", UserController.checkUser);
router.get("/:id", UserController.getUserById);
router.patch(
  "/edit/",
  checkUser,
  imageUpload.single("image"),
  UserController.edit
);

module.exports = router;
