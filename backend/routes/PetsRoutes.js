const router = require("express").Router();
const PetsController = require("../controllers/PetsController");
const imageUpload = require("../helpers/image-upload");
const verifyToken = require("../helpers/middleware/check-user");

router.post(
  "/create",
  verifyToken,
  imageUpload.array("images"),
  PetsController.create
);

router.get("/getall", PetsController.getAll);
router.get("/myadoptions", verifyToken, PetsController.getAllUserAdoptions);
router.get("/:id", PetsController.getPet);
router.delete("/:id", verifyToken, PetsController.removePet);
router.patch(
  "/:id",
  verifyToken,
  imageUpload.array("images"),
  PetsController.updatePet
);
router.patch("/schedule/:id", verifyToken, PetsController.schedule);
router.patch("/conclude/:id", verifyToken, PetsController.concludeAdoption);
module.exports = router;
