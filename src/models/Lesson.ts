import { sequelize } from './../db/db';
import { Model, DataTypes } from 'sequelize';

export class Employee extends Model {
  public id!: number;
  public name: string;
  public age: string;
  public description: string;
  public depId: number;
}

Employee.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING },
    age: { type: DataTypes.STRING },
    description: { type: DataTypes.STRING },
    depId: { type: DataTypes.INTEGER },
  },
  {
    sequelize,
    tableName: 'Employee',
  },
);
