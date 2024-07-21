const router = require("express").Router();
const { authenticateJWT } = require("../middlewares/Auth");
const memberCtrl = require("../controllers/Member");

router.use(authenticateJWT);
router.get("/group/:id", memberCtrl.getAllMembers);
router.get("/:id", memberCtrl.getMemberByID);
router.post("/", memberCtrl.addMember);
router.post("/new", memberCtrl.addNewUser);

router.delete("/:memberId", memberCtrl.deleteMember);

module.exports = router;