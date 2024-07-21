const { sequelize } = require("../db");
const { DataTypes } = require('sequelize');
const bcrypt = require("bcryptjs");

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
        tableName: "users",
        hooks: {
            afterSync: async (options) => {
                // Insert default admin user
                await User.findOrCreate({
                    where: { user_name: 'testAdmin' },
                    defaults: {
                        full_name: "Test Admin",
                        user_name: "test_admin",
                        password: await bcrypt.hash("password", 10),
                    }
                });
            }
        }
    },
);


module.exports = User;