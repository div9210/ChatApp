const { sequelize } = require("../db");
const { DataTypes } = require('sequelize');

const User = sequelize.define(
    'User',
    {
        // Model attributes are defined here
        user_id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4, // Or DataTypes.UUIDV1,
            unique: true,
            primaryKey: true
        },
        user_name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        full_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },

    },
    {
        tableName: "users"
    },
);


module.exports = User;