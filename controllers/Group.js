const models = require("../db/Models");
const bcrypt = require("bcryptjs");

module.exports = {
    createGroupByNewUser: async (req, res, next) => {
        try {
            let {
                userName,
                fullName,
                password,
                groupName
            } = req.body;

            if (!userName || !fullName || !password || !groupName) {
                return res.status(400).json({
                    message: "Invalid Request : Give userName, fullName, password and groupName"
                });
            }

            let passwordHash = await bcrypt.hash(password, 10);

            // Find if user exists already
            const userExists = await models.User.findOne({
                where: {
                    user_name: userName
                }
            });

            if (userExists) {
                return res.status(400).json({
                    message: "Username already exists!"
                });
            }
            // Create the new user
            const newUser = await models.User.create({
                user_name: userName,
                full_name: fullName,
                password: passwordHash
            });

            // Find if group exists already
            const groupExists = await models.Group.findOne({
                where: {
                    group_name: groupName
                }
            });

            if (groupExists) {
                return res.status(400).json({
                    message: "Group name already exists!"
                });
            }
            // Create the new group
            const newGroup = await models.Group.create({
                group_name: groupName,
                created_by: newUser.user_id
            });

            // Add the user as the new member of the group
            await models.Member.create({
                group_id: newGroup.group_id,
                user_id: newUser.user_id,
                is_admin: true
            });

            return res.status(200).json({
                message: "Group has been created successfully!",
                data: {
                    user: newUser
                }
            });

        } catch (error) {
            next(error);
        }
    },

    createGroupByExistingUser: async (req, res, next) => {
        try {
            const { groupName } = req.body;
            const userId = req.user.user_id;

            if (!groupName || !userId) {
                return res.status(400).json({
                    message: "Invalid Request : Give userId and groupName."
                });
            }

            // Find an exisiting user with userId
            const findUser = await models.User.findOne({
                where: {
                    user_id: userId
                }
            });

            if (!findUser) {
                return res.status(400).json({
                    message: "Invalid Request : No such user exists!"
                });
            }

            const newGroup = await models.Group.create({
                group_name: groupName,
                created_by: userId
            });

            // Add the user as the new member of the group
            await models.Member.create({
                group_id: newGroup.group_id,
                user_id: userId,
                is_admin: true
            });

            return res.status(200).json({
                message: "Group has been created successfully!"
            })
        } catch (error) {
            next(error);
        }
    },

    updateGroup: async (req, res, next) => {
        try {
            const { groupName } = req.body;
            const { userId } = req.params;

            if (!groupName || !userId) {
                return res.status(400).json({
                    message: "Invalid Request : Give userId and groupName."
                });
            }

            // Find if the logged in exisiting member is the admin
            const member = await models.Member.findOne({
                where: {
                    user_id: userId,
                    group_id: groupId,
                    is_admin: true
                }
            });

            if (!member) {
                return res.status(400).json({
                    message: "You don't have admin rights!"
                });
            }

            await models.Group.update({
                group_name: groupName,
                updatedAt: new Date()
            });

            return res.status(200).json({
                message: "Group has been updated successfully!"
            });

        } catch (error) {
            next(error);
        }
    }
}