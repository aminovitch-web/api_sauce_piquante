const express = require("express");
const sauceCtrl = require("../controller/sauceController");
const router = express.Router();
const multer = require("../middleware/multer");
const auth = require("../middleware/auth");
const app = express();
const path = require("path");

router.get("/", auth, sauceCtrl.getAllSauce);
router.get("/:id", auth, sauceCtrl.getOneSauce);
router.post("/", auth, multer, sauceCtrl.createSauce);
router.put("/:id", auth, multer, sauceCtrl.modifySauce);
router.delete("/:id", auth, sauceCtrl.deleteSauce);
router.post("/:id/like", auth, sauceCtrl.sauceReview);
module.exports = router;
