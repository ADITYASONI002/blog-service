import { Sequelize, DataTypes, Model } from 'sequelize';
import bcrypt from 'bcrypt';
export class Users extends Model {
  static associate(models: any) {
    Users.hasMany(models.Blogs, {
      foreignKey: 'authorId',
    });
  }
}

export default (sequelize: Sequelize) => {
  Users.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      fullName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        set(value: string) {
          this.setDataValue('password', bcrypt.hashSync(value, 10));
        },
      },
      createdAt: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
      },
    },
    {
      sequelize,
      tableName: 'Users',
    }
  );

  return Users;
};
