const { sequelize } = require("../db");
const { DataTypes } = require('sequelize');
const User = require("./User");

const Messages = sequelize.define(
    'Messages',
    {
        // Model attributes are defined here
        message_id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4, // Or DataTypes.UUIDV1,
            unique: true,
            primaryKey: true
        },
        text: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        from: {
            type: DataTypes.UUID,
            references: {
                model: User,
                key: "user_id"
            },
            allowNull: false
        },
        group_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },

    },
    {
        tableName: "messages"
    },
);


module.exports = Messages;