'use strict';
const bcrypt = require('bcryptjs/dist/bcrypt');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: "Username must be unique",
      },
      validate: {
        notNull: {
          msg: "Username cannot be empty",
        },
        notEmpty: {
          msg: "Username cannot be empty",
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: "Email must be unique",
      },
      validate: {
        notNull: {
          msg: "Email cannot be empty",
        },
        notEmpty: {
          msg: "Email cannot be empty",
        },
        isEmail: {
          msg: "Worng email format",
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Password cannot be empty",
        },
        notEmpty: {
          msg: "Password cannot be empty",
        },
        len: {
          args: [6, 32],
          msg: "Input 6-32 characters",
        },
      }
    },
    isMember: DataTypes.BOOLEAN
  }, {
    hooks: {
      beforeCreate(user) {
        user.password = bcrypt.hashSync(user.password, 10);
        user.isMember = false
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};