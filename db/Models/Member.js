const { sequelize } = require("../db");
const { DataTypes } = require('sequelize');
const User = require("./User");
const Group = require("./Group");

const Member = sequelize.define(
    'Member',
    {
        // Model attributes are defined here
        member_id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4, // Or DataTypes.UUIDV1,
            unique: true,
            primaryKey: true
        },
        group_id: {
            type: DataTypes.UUID,
            references: {
                model: Group,
                key: "group_id"
            },
            allowNull: false
        },
        user_id: {
            type: DataTypes.UUID,
            references: {
                model: User,
                key: "user_id"
            },
            allowNull: false
        },
        is_admin: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    },
    {
        tableName: "members"
    },
);

// Define the associations
Member.belongsTo(User, { foreignKey: 'user_id' });
User.hasMany(Member, { foreignKey: 'user_id' });


module.exports = Member;