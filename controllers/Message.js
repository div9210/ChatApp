const models = require("../db/Models");

module.exports = {
    sendMessageInGroup: async (req, res, next) => {
        try {
            const { groupId, messageText } = req.body;
            const userId = req.user.user_id;
            // Check if the logged in user is part of this group
            const member = await models.Member.findOne({
                group_id: groupId,
                user_id: userId
            });

            if (!member) {
                return res.status(404).json({
                    message: "You are not a part of this group."
                });
            }

            const message = await models.Messages.create({
                from: userId,
                group_id: groupId,
                text: messageText
            });

            return res.status(200).json({
                message: "Message has been sent successfully!",
                data: message
            });
        } catch (error) {
            next(error)
        }
    },
    likeMessage: async (req, res, next) => {
        try {
            const { messageId } = req.body;
            const userId = req.user.user_id;

            // Find the message in the group
            const findMessage = await models.Messages.findOne({
                where: {
                    message_id: messageId
                },
                include: [
                    {
                        model: models.Group
                    }
                ]
            });

            if (!findMessage) {
                return res.status(404).json({
                    message: "Invalid Message"
                })
            }

            // Check if this user belongs to the Group
            let groupId = findMessage.group_id;

            // Check if the logged in user is part of this group
            const member = await models.Member.findOne({
                group_id: groupId,
                user_id: userId
            });

            if (!member) {
                return res.status(404).json({
                    message: "You are not a part of this group."
                });
            }

            const likeMessage = await models.LikedMessage.create({
                message_id: messageId,
                user_id: userId
            });

            return res.status(200).json({
                message: "Message has been liked successfully!",
                data: likeMessage
            });

        } catch (error) {
            next(error);
        }
    },

    removeLike: async (req, res, next) => {
        try {
            const { messageId } = req.params;
            const userId = req.user.user_id;

            // Find the message in the group
            const findMessage = await models.Messages.findOne({
                where: {
                    message_id: messageId
                },
                include: [
                    {
                        model: models.Group
                    }
                ]
            });

            if (!findMessage) {
                return res.status(404).json({
                    message: "Invalid Message"
                })
            }

            // Check if this user belongs to the Group
            let groupId = findMessage.group_id;

            // Check if the logged in user is part of this group
            const member = await models.Member.findOne({
                group_id: groupId,
                user_id: userId
            });

            if (!member) {
                return res.status(404).json({
                    message: "You are not a part of this group."
                });
            }

            await models.LikedMessage.destroy({
                where: {
                    message_id: messageId,
                    user_id: userId
                }
            });

            return res.status(200).json({
                message: "Message has been disliked successfully!"
            });
        } catch (error) {
            next(error);
        }
    },

    deleteMessage: async (req, res, next) => {
        try {
            const { messageId } = req.body;

            // Find this message
            const findMessage = await models.Messages.findOne({
                message_id: messageId
            });

            if (!findMessage) {
                return res.status(404).json({
                    message: "No such message found."
                })
            }

            await models.Messages.destroy({
                where: {
                    message_id: messageId
                }
            });

            return res.status(200).json({
                message: "Message has been deleted successfully!"
            });
        } catch (error) {
            next(error);
        }
    }

}