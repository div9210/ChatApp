const models = require("../db/Models");

module.exports = {
    getAllMembers: async (req, res, next) => {
        try {
            const { id } = req.params;

            // Check if the logged in user can see this group members
            let userId = req.user.user_id;
            let findMember = await models.Member.findOne({
                where: {
                    group_id: id,
                    user_id: userId,

                }
            });

            if (!findMember) {
                return res.status(400).json({
                    message: "You are not a part of this group!"
                });
            }

            // Find all the members that are in this group
            let members = await models.Member.findAll({
                where: {
                    group_id: id
                },
                include: [
                    {
                        model: models.User
                    }
                ]
            });

            if (members.length == 0) {
                return res.status(404).json({
                    message: "No members found!"
                });
            }

            return res.status(200).json({
                message: "Members List!",
                data: members
            });
        } catch (error) {
            next(error);
        }
    },

    getMemberByID: async (req, res, next) => {
        try {
            const { id } = req.params;

            const findMember = await models.Member.findOne({
                where: {
                    member_id: id
                },
                include: [
                    {
                        model: models.User
                    }
                ]
            });



            if (!findMember) {
                return res.status(404).json({
                    message: "No such user exists!"
                });
            }

            let groupId = findMember.group_id;
            // Check if the logged in user can see this group members
            let userId = req.user.user_id;
            let loggedInMember = await models.Member.findOne({
                where: {
                    group_id: groupId,
                    user_id: userId,

                }
            });

            if (!loggedInMember) {
                return res.status(400).json({
                    message: "You are not a part of this group!"
                });
            }


            return res.status(200).json({
                message: "Member info!",
                data: findMember
            });
        } catch (error) {
            next(error);
        }
    },

    createMember: async (req, res, next) => {
        try {
            const { userId, groupId } = req.body;
            // Check if the logged in user is the admin of this group
            let loggedInId = req.user.user_id;
            let loggedInMember = await models.Member.findOne({
                where: {
                    group_id: groupId,
                    user_id: loggedInId,
                    is_admin: true
                }
            });

            if (!loggedInMember) {
                return res.status(400).json({
                    message: "You do not have admin rights for this group!"
                });
            }

            const member = await models.Member.create({
                user_id: userId,
                group_id: groupId,
                is_admin: false
            });

            return res.status(200).json({
                message: "Member has been added successfully!",
                data: member
            });
        } catch (error) {
            next(error);
        }
    }
}