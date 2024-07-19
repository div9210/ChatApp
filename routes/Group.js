const router = require("express").Router();
const { authenticateJWT } = require("../middlewares/Auth");
const groupCtrl = require("../controllers/Group");

// Sign Up and Create a NEW group
router.post("/", groupCtrl.createGroupByNewUser);

// Login Verification
router.use(authenticateJWT);

// Open user routes
router.post("/existing", groupCtrl.createGroupByExistingUser);
router.put("/", groupCtrl.updateGroup);
// router.delete("/:id", groupCtrl.deleteGroup);

module.exports = router;