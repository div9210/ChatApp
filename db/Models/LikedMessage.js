const { sequelize } = require("../db");
const { DataTypes } = require('sequelize');
const User = require("./User");
const Messages = require("./Messages");


const LikedMessage = sequelize.define(
    'liked_msg',
    {
        // Model attributes are defined here
        message_id: {
            type: DataTypes.UUID,
            references: {
                model: Messages,
                key: "message_id"
            },
            primaryKey: true,
            allowNull: false
        },
        user_id: {
            type: DataTypes.UUID,
            references: {
                model: User,
                key: "user_id"
            },
            primaryKey: true,
            allowNull: false
        }
    },
    {
        tableName: "liked_msg"
    },
);


module.exports = LikedMessage;