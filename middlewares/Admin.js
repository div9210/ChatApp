module.exports = {
    checkAdminRights: async (req, res, next) => {
        try {
            // Check if the user is an admin of a group
            const userId = req.user.user_id;
            const member = await models.Member.findAll({
                where: {
                    user_id: userId,
                    is_admin: true
                }
            });

            if (member.length > 0) {
                next();
            } else {
                return res.status(400).json({
                    message: "Only admin can perform user related actions!"
                });
            }
        } catch (error) {
            next(error);
        }
    }
}