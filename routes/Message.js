const router = require("express").Router();
const { authenticateJWT } = require("../middlewares/Auth");
const messageCtrl = require("../controllers/Message");

router.use(authenticateJWT);

router.post("/send", messageCtrl.sendMessageInGroup);
router.post("/like", messageCtrl.likeMessage);
router.delete("/remove-like/:messageId", messageCtrl.removeLike);
router.delete("/", messageCtrl.deleteMessage);


module.exports = router;