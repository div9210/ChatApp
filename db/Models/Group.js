const { sequelize } = require("../db");
const { DataTypes } = require('sequelize');
const User = require("./User");

const Group = sequelize.define(
    'Group',
    {
        // Model attributes are defined here
        group_id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4, // Or DataTypes.UUIDV1,
            unique: true,
            primaryKey: true
        },
        group_name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        created_by: {
            type: DataTypes.UUID,
            references: {
                model: User,
                key: "user_id"
            },
            allowNull: false
        }
    },
    {
        tableName: "groups"
    },
);

// Associations
Group.belongsTo(User, { foreignKey: 'created_by', onDelete: "CASCADE" });
User.hasMany(Group, { foreignKey: 'created_by', onDelete: 'CASCADE', });

module.exports = Group;