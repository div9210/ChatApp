const router = require("express").Router();
const { authenticateJWT } = require("../middlewares/Auth");
const memberCtrl = require("../controllers/Member");

router.use(authenticateJWT);
router.get("/group/:id", memberCtrl.getAllMembers);
router.get("/:id", memberCtrl.getMemberByID);
router.post("/", memberCtrl.createMember);
// router.put("/member/:id", groupCtrl.updateMember);
// router.delete("/member/:id", groupCtrl.deleteMember);

module.exports = router;