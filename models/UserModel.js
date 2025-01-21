const { DataTypes, UUIDV4 } = require("sequelize");
const DbConfigurator = require("../config/Database");


const sequelize = new DbConfigurator().getSequelize()

const UserModel = sequelize.define(
    'User',
    {
        id : {
            type : DataTypes.UUID,
            defaultValue : UUIDV4,
            primaryKey : true
        },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      avatar : {
        type : DataTypes.STRING,
        allowNull : true
      },
      deletedAt : {
        type : DataTypes.DATE,
        allowNull : true
      }
    },
  )


module.exports = UserModel