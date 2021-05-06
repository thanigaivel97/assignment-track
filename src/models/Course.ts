import { Model, DataTypes } from 'sequelize';
import { sequelize } from './../db/db';
import { Employee } from './Lesson';

export class Department extends Model {
  public id!: number;
  public departmentName: string;
  public departmentNo: string;
  public location: string;
 
}

Department.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    departmentName: { type: DataTypes.STRING },
    departmentNo: { type: DataTypes.STRING },
    location: { type: DataTypes.STRING },

  },
  {
    sequelize,
    tableName: 'Departments',
  },
);

Department.hasMany(Employee, { foreignKey: 'depId', as: 'Employee' });
Employee.belongsTo(Department, { foreignKey: 'depId', as: 'Department' });
