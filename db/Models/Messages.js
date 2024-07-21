const { sequelize } = require("../db");
const { DataTypes } = require('sequelize');
const User = require("./User");
const Group = require("./Group");

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
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: Group,
                key: "group_id"
            }
        },

    },
    {
        tableName: "messages"
    },
);

// Associations
Messages.belongsTo(Group, { foreignKey: 'group_id' });
Group.hasMany(Messages, { foreignKey: 'group_id' });

module.exports = Messages;